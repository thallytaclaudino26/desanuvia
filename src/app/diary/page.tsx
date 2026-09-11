"use client";

import { useEffect, useState } from "react";
import {
  addMoodEntry,
  getMoodEntries,
  getProgress,
  calculateStreak,
  type MoodEntry,
} from "@/lib/storage";

const moods = [
  { emoji: "😌", label: "Tranquilo(a)", score: 5 },
  { emoji: "🙂", label: "Bem", score: 4 },
  { emoji: "😐", label: "Neutro", score: 3 },
  { emoji: "😟", label: "Ansioso(a)", score: 2 },
  { emoji: "😣", label: "Sobrecarregado(a)", score: 1 },
];

export default function DiaryPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [stats, setStats] = useState({ current: 0, longest: 0, totalSessions: 0 });
  const [note, setNote] = useState("");

  function refresh() {
    setEntries(getMoodEntries());
    setStats(calculateStreak(getProgress()));
  }

  useEffect(() => {
    // Mesmo motivo do /home: dados vêm de localStorage, só existem no navegador.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
  }, []);

  function handleAdd(m: (typeof moods)[number]) {
    addMoodEntry({ emoji: m.emoji, score: m.score, note: note || undefined });
    setNote("");
    refresh();
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-5 pt-8">
      <h1 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
        Diário
      </h1>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Dias seguidos" value={stats.current} />
        <StatCard label="Sessões praticadas" value={stats.totalSessions} />
      </div>

      <section className="flex flex-col gap-3 rounded-2xl border border-teal-900/10 bg-white px-4 py-4 dark:border-teal-100/10 dark:bg-neutral-900">
        <h2 className="text-sm font-medium text-teal-900 dark:text-teal-100">
          Como você está agora?
        </h2>
        <div className="flex justify-between">
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => handleAdd(m)}
              className="text-2xl"
              title={m.label}
            >
              {m.emoji}
            </button>
          ))}
        </div>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Nota rápida (opcional)"
          className="rounded-lg border border-teal-900/10 bg-teal-50 px-3 py-2 text-sm dark:border-teal-100/10 dark:bg-neutral-800"
        />
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-teal-900 dark:text-teal-100">
          Histórico
        </h2>
        {entries.length === 0 && (
          <p className="text-sm text-teal-700/60 dark:text-teal-300/60">
            Nenhum registro ainda.
          </p>
        )}
        {entries.map((e) => (
          <div
            key={e.id}
            className="flex items-center gap-3 rounded-xl border border-teal-900/10 bg-white px-4 py-3 dark:border-teal-100/10 dark:bg-neutral-900"
          >
            <span className="text-xl">{e.emoji}</span>
            <div className="flex flex-col">
              <span className="text-sm text-teal-900 dark:text-teal-100">
                {new Date(e.createdAt).toLocaleString("pt-BR", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
              {e.note && (
                <span className="text-xs text-teal-700/60 dark:text-teal-300/60">
                  {e.note}
                </span>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-teal-900/10 bg-white px-4 py-3 text-center dark:border-teal-100/10 dark:bg-neutral-900">
      <div className="text-2xl font-semibold text-teal-800 dark:text-teal-200">
        {value}
      </div>
      <div className="text-xs text-teal-700/60 dark:text-teal-300/60">{label}</div>
    </div>
  );
}
