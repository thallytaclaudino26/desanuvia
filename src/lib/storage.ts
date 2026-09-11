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

const MOOD_KEY = "desanuvia:mood-entries";
const PROGRESS_KEY = "desanuvia:progress";
const ONBOARDING_KEY = "desanuvia:onboarding-done";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getMoodEntries(): MoodEntry[] {
  return read<MoodEntry[]>(MOOD_KEY, []);
}

export function addMoodEntry(entry: {
  emoji: string;
  score: number;
  note?: string;
}): MoodEntry {
  const entries = getMoodEntries();
  const hour = new Date().getHours();
  const timeOfDay: MoodEntry["timeOfDay"] =
    hour < 6 ? "madrugada" : hour < 12 ? "manha" : hour < 18 ? "tarde" : "noite";
  const newEntry: MoodEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timeOfDay,
    createdAt: new Date().toISOString(),
  };
  write(MOOD_KEY, [newEntry, ...entries]);
  return newEntry;
}

export function getProgress(): ProgressEntry[] {
  return read<ProgressEntry[]>(PROGRESS_KEY, []);
}

export function markContentCompleted(contentId: string) {
  const progress = getProgress();
  write(PROGRESS_KEY, [
    { contentId, status: "completed", createdAt: new Date().toISOString() },
    ...progress,
  ]);
}

export function isOnboardingDone(): boolean {
  return read<boolean>(ONBOARDING_KEY, false);
}

export function setOnboardingDone(value: boolean) {
  write(ONBOARDING_KEY, value);
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
