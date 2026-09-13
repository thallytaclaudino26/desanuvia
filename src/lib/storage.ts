import { createClient } from "@/lib/supabase/client";

export interface MoodEntry {
  id: string;
  emoji: string;
  score: number;
  note?: string;
  timeOfDay: "madrugada" | "manha" | "tarde" | "noite";
  createdAt: string;
}

export interface ProgressEntry {
  contentId: string;
  status: "completed";
  createdAt: string;
}

const ONBOARDING_KEY = "desanuvia:onboarding-done";
const PENDING_MOOD_KEY = "desanuvia:pending-mood";

interface PendingMood {
  emoji: string;
  score: number;
  note?: string;
}

function timeOfDayNow(): MoodEntry["timeOfDay"] {
  const hour = new Date().getHours();
  return hour < 6 ? "madrugada" : hour < 12 ? "manha" : hour < 18 ? "tarde" : "noite";
}

export async function getMoodEntries(): Promise<MoodEntry[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("mood_entries")
    .select("id, emoji, score, note, time_of_day, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    emoji: row.emoji,
    score: row.score,
    note: row.note ?? undefined,
    timeOfDay: row.time_of_day,
    createdAt: row.created_at,
  }));
}

export async function addMoodEntry(entry: {
  emoji: string;
  score: number;
  note?: string;
}): Promise<MoodEntry | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("mood_entries")
    .insert({
      user_id: user.id,
      emoji: entry.emoji,
      score: entry.score,
      note: entry.note ?? null,
      time_of_day: timeOfDayNow(),
    })
    .select("id, emoji, score, note, time_of_day, created_at")
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    emoji: data.emoji,
    score: data.score,
    note: data.note ?? undefined,
    timeOfDay: data.time_of_day,
    createdAt: data.created_at,
  };
}

export async function getProgress(): Promise<ProgressEntry[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("progress")
    .select("content_id, status, created_at")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    contentId: row.content_id,
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function markContentCompleted(contentId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("progress").insert({
    user_id: user.id,
    content_id: contentId,
    status: "completed",
  });
}

export function isOnboardingDone(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(ONBOARDING_KEY) === "true";
  } catch {
    return false;
  }
}

export function setOnboardingDone(value: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ONBOARDING_KEY, String(value));
  } catch {
    // localStorage indisponível (modo privado, por exemplo) — segue sem persistir.
  }
}

export function setPendingMoodEntry(entry: PendingMood) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PENDING_MOOD_KEY, JSON.stringify(entry));
  } catch {
    // Sem localStorage disponível — o check-in inicial simplesmente não é
    // pré-preenchido depois do login, sem impacto no restante do fluxo.
  }
}

// O check-in de humor do onboarding acontece antes de existir conta (a pessoa
// ainda não fez login/cadastro). Guardamos esse humor localmente e só o
// enviamos ao Supabase depois que o login é concluído, quando já existe um
// user_id válido para satisfazer a política de RLS da tabela mood_entries.
export async function flushPendingMoodEntry() {
  if (typeof window === "undefined") return;
  const raw = window.localStorage.getItem(PENDING_MOOD_KEY);
  if (!raw) return;

  window.localStorage.removeItem(PENDING_MOOD_KEY);
  try {
    const entry = JSON.parse(raw) as PendingMood;
    await addMoodEntry(entry);
  } catch {
    // Entrada corrompida — descartamos em vez de travar o login.
  }
}

export function calculateStreak(progress: ProgressEntry[]) {
  if (progress.length === 0) return { current: 0, longest: 0, totalSessions: 0 };

  const days = Array.from(
    new Set(progress.map((p) => p.createdAt.slice(0, 10)))
  ).sort((a, b) => (a < b ? 1 : -1));

  let current = 0;
  const cursor = new Date();
  for (const day of days) {
    const cursorStr = cursor.toISOString().slice(0, 10);
    if (day === cursorStr) {
      current += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    const diffDays =
      (new Date(days[i - 1]).getTime() - new Date(days[i]).getTime()) /
      (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      run += 1;
    } else {
      longest = Math.max(longest, run);
      run = 1;
    }
  }
  longest = Math.max(longest, run, current);

  return { current, longest, totalSessions: progress.length };
}
