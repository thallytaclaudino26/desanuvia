"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BreathingCircle } from "./BreathingCircle";
import type { ContentItem } from "@/lib/content";
import { markContentCompleted } from "@/lib/storage";

const DEFAULT_PATTERN = { inhale: 4, hold1: 4, exhale: 6 };

export function SessionPlayer({
  item,
  autoStart = false,
}: {
  item: ContentItem;
  autoStart?: boolean;
}) {
  const router = useRouter();
  const [running, setRunning] = useState(autoStart);
  const [secondsLeft, setSecondsLeft] = useState(item.durationSeconds);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          setCompleted(true);
          markContentCompleted(item.id);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, item.id]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  if (completed) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-6 px-6 text-center">
        <span className="text-4xl">✨</span>
        <h1 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
          Sessão concluída
        </h1>
        <p className="text-teal-700/80 dark:text-teal-300/80">{item.title}</p>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/home")}
            className="rounded-full bg-teal-700 px-6 py-3 font-medium text-white"
          >
            Voltar ao início
          </button>
          <button
            onClick={() => router.push("/diary")}
            className="rounded-full border border-teal-700 px-6 py-3 font-medium text-teal-700 dark:text-teal-200"
          >
            Ver diário
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-8 px-6 text-center">
      <div>
        <h1 className="text-xl font-semibold text-teal-900 dark:text-teal-100">
          {item.title}
        </h1>
        <p className="mt-1 text-sm text-teal-700/70 dark:text-teal-300/70">
          {item.description}
        </p>
      </div>

      <BreathingCircle pattern={item.pattern ?? DEFAULT_PATTERN} running={running} />

      <div className="flex flex-col items-center gap-3">
        <span className="text-sm tabular-nums text-teal-700/70 dark:text-teal-300/70">
          {minutes}:{seconds} restantes
        </span>
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-full bg-teal-700 px-8 py-3 font-medium text-white"
        >
          {running ? "Pausar" : "Começar"}
        </button>
      </div>

      {!item.audioUrl && (
        <p className="max-w-xs text-xs text-teal-700/50 dark:text-teal-300/50">
          Áudio narrado ainda não adicionado a esta sessão — em breve, com a voz gravada por você.
        </p>
      )}

      <Link href="/library" className="text-xs text-teal-700/60 underline dark:text-teal-300/60">
        Voltar à biblioteca
      </Link>
    </main>
  );
}
