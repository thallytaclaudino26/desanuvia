"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { BreathingPattern } from "@/lib/content";

type PhaseName = "inhale" | "hold1" | "exhale" | "hold2";

const PHASE_LABELS: Record<PhaseName, string> = {
  inhale: "Inspire",
  hold1: "Segure",
  exhale: "Expire",
  hold2: "Segure",
};

function buildPhases(pattern: BreathingPattern) {
  const phases: { name: PhaseName; seconds: number }[] = [
    { name: "inhale", seconds: pattern.inhale },
  ];
  if (pattern.hold1) phases.push({ name: "hold1", seconds: pattern.hold1 });
  phases.push({ name: "exhale", seconds: pattern.exhale });
  if (pattern.hold2) phases.push({ name: "hold2", seconds: pattern.hold2 });
  return phases;
}

export function BreathingCircle({
  pattern,
  running,
  onCycleComplete,
}: {
  pattern: BreathingPattern;
  running: boolean;
  onCycleComplete?: () => void;
}) {
  const phases = useMemo(() => buildPhases(pattern), [pattern]);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(phases[0].seconds);
  const onCycleCompleteRef = useRef(onCycleComplete);

  useEffect(() => {
    onCycleCompleteRef.current = onCycleComplete;
  });

  // Reinicia a animação sempre que "running" muda, ajustando o estado durante
  // a própria renderização (padrão recomendado pelo React em vez de useEffect).
  const [prevRunning, setPrevRunning] = useState(running);
  if (running !== prevRunning) {
    setPrevRunning(running);
    if (running) {
      setPhaseIndex(0);
      setSecondsLeft(phases[0].seconds);
    }
  }

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((s) => (s > 1 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running, phaseIndex]);

  useEffect(() => {
    if (!running || secondsLeft > 0) return;
    setPhaseIndex((i) => {
      const next = (i + 1) % phases.length;
      if (next === 0) onCycleCompleteRef.current?.();
      setSecondsLeft(phases[next].seconds);
      return next;
    });
  }, [secondsLeft, running, phases]);

  const current = phases[phaseIndex];
  const expanded = current.name === "inhale" || current.name === "hold1";

  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <div
        className="absolute rounded-full bg-teal-400/30 transition-transform ease-in-out dark:bg-teal-300/20"
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${expanded ? 1 : 0.55})`,
          transitionDuration: `${current.seconds}s`,
        }}
      />
      <div
        className="absolute rounded-full bg-teal-500/50 transition-transform ease-in-out dark:bg-teal-400/40"
        style={{
          width: "70%",
          height: "70%",
          transform: `scale(${expanded ? 1 : 0.6})`,
          transitionDuration: `${current.seconds}s`,
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-1">
        <span className="text-lg font-medium text-teal-900 dark:text-teal-50">
          {running ? PHASE_LABELS[current.name] : "Pronto"}
        </span>
        <span className="text-3xl font-semibold tabular-nums text-teal-900 dark:text-teal-50">
          {running ? secondsLeft : current.seconds}
        </span>
      </div>
    </div>
  );
}
