"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addMoodEntry, setOnboardingDone } from "@/lib/storage";

const moods = [
  { emoji: "😌", label: "Tranquilo(a)", score: 5 },
  { emoji: "🙂", label: "Bem", score: 4 },
  { emoji: "😐", label: "Neutro", score: 3 },
  { emoji: "😟", label: "Ansioso(a)", score: 2 },
  { emoji: "😣", label: "Sobrecarregado(a)", score: 1 },
];

const reasons = [
  "Ansiedade do dia a dia",
  "Dificuldade para dormir",
  "Estresse no trabalho",
  "Só quero uma pausa",
];

type Mood = (typeof moods)[number];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState<Mood | null>(null);
  const [reason, setReason] = useState<string | null>(null);

  function finish() {
    if (mood) {
      addMoodEntry({ emoji: mood.emoji, score: mood.score, note: reason ?? undefined });
    }
    setOnboardingDone(true);
    router.replace("/home");
  }

  const totalSteps = 4;

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-8 px-6 py-10">
      {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
      {step === 1 && <AboutStep onNext={() => setStep(2)} />}
      {step === 2 && (
        <MoodStep mood={mood} onSelect={setMood} onNext={() => setStep(3)} />
      )}
      {step === 3 && (
        <ReasonStep reason={reason} onSelect={setReason} onFinish={finish} />
      )}

      <div className="flex justify-center gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-6 rounded-full ${
              i === step ? "bg-teal-600" : "bg-teal-200 dark:bg-teal-900"
            }`}
          />
        ))}
      </div>
    </main>
  );
}

function WelcomeStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h1 className="text-3xl font-semibold text-teal-900 dark:text-teal-100">
        DesanuvIA
      </h1>
      <p className="text-teal-800/80 dark:text-teal-200/80">
        Um espaço em português para respirar, meditar e entender melhor o que você
        sente.
      </p>
      <button
        onClick={onNext}
        className="rounded-full bg-teal-700 px-8 py-3 font-medium text-white"
      >
        Começar
      </button>
    </div>
  );
}

function AboutStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
        Como funciona
      </h2>
      <p className="text-teal-800/80 dark:text-teal-200/80">
        Práticas curtas de respiração e meditação que se adaptam a como você está se
        sentindo, dia a dia.
      </p>
      <button
        onClick={onNext}
        className="rounded-full bg-teal-700 px-8 py-3 font-medium text-white"
      >
        Continuar
      </button>
    </div>
  );
}

function MoodStep({
  mood,
  onSelect,
  onNext,
}: {
  mood: Mood | null;
  onSelect: (m: Mood) => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
        Como você está agora?
      </h2>
      <div className="grid w-full grid-cols-1 gap-2">
        {moods.map((m) => (
          <button
            key={m.label}
            onClick={() => onSelect(m)}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
              mood?.label === m.label
                ? "border-teal-600 bg-teal-100 dark:bg-teal-900/40"
                : "border-teal-900/10 bg-white dark:border-teal-100/10 dark:bg-neutral-900"
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-teal-900 dark:text-teal-100">{m.label}</span>
          </button>
        ))}
      </div>
      <button
        onClick={onNext}
        disabled={!mood}
        className="rounded-full bg-teal-700 px-8 py-3 font-medium text-white disabled:opacity-40"
      >
        Continuar
      </button>
    </div>
  );
}

function ReasonStep({
  reason,
  onSelect,
  onFinish,
}: {
  reason: string | null;
  onSelect: (r: string) => void;
  onFinish: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h2 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
        O que te traz aqui?
      </h2>
      <div className="grid w-full grid-cols-1 gap-2">
        {reasons.map((r) => (
          <button
            key={r}
            onClick={() => onSelect(r)}
            className={`rounded-xl border px-4 py-3 text-left text-teal-900 transition-colors dark:text-teal-100 ${
              reason === r
                ? "border-teal-600 bg-teal-100 dark:bg-teal-900/40"
                : "border-teal-900/10 bg-white dark:border-teal-100/10 dark:bg-neutral-900"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <button
        onClick={onFinish}
        className="rounded-full bg-teal-700 px-8 py-3 font-medium text-white"
      >
        Ver minha recomendação
      </button>
    </div>
  );
}
