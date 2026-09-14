"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDailyRecommendation } from "@/lib/recommendation";
import { getDailyTip } from "@/lib/motivation";
import type { ContentItem } from "@/lib/content";

export default function HomePage() {
  const [recommendation, setRecommendation] = useState<ContentItem | null>(null);
  const [tip, setTip] = useState<string | null>(null);

  useEffect(() => {
    getDailyRecommendation().then(setRecommendation);
    // Calculado no cliente (depende da data local) para não descasar do
    // HTML gerado no servidor em builds estáticos.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTip(getDailyTip());
  }, []);

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-5 pt-8">
      <header>
        <p className="text-sm text-teal-700/70 dark:text-teal-300/70">Olá,</p>
        <h1 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
          Como você está hoje?
        </h1>
      </header>

      {recommendation && (
        <Link
          href={`/session/${recommendation.id}`}
          className="flex flex-col gap-2 rounded-2xl bg-teal-700 px-5 py-5 text-white shadow-lg shadow-teal-700/20"
        >
          <span className="text-xs uppercase tracking-wide text-teal-100">
            Recomendado para agora
          </span>
          <span className="text-xl font-semibold">{recommendation.title}</span>
          <span className="text-sm text-teal-50/90">{recommendation.description}</span>
        </Link>
      )}

      <div className="grid grid-cols-3 gap-3">
        <QuickLink href="/library/breathing" emoji="🌬️" label="Respirar" />
        <QuickLink href="/library/meditacoes" emoji="🧘" label="Meditar" />
        <QuickLink href="/session/med-sono" emoji="🌙" label="Dormir" />
      </div>

      {tip && (
        <div className="rounded-2xl border border-teal-900/10 bg-white px-5 py-4 dark:border-teal-100/10 dark:bg-neutral-900">
          <span className="text-xs uppercase tracking-wide text-teal-700/60 dark:text-teal-300/60">
            Pensamento do dia
          </span>
          <p className="mt-1 text-sm text-teal-900 dark:text-teal-100">{tip}</p>
        </div>
      )}
    </main>
  );
}

function QuickLink({
  href,
  emoji,
  label,
}: {
  href: string;
  emoji: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 rounded-xl border border-teal-900/10 bg-white px-3 py-4 text-center dark:border-teal-100/10 dark:bg-neutral-900"
    >
      <span className="text-2xl">{emoji}</span>
      <span className="text-xs font-medium text-teal-900 dark:text-teal-100">
        {label}
      </span>
    </Link>
  );
}
