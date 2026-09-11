export type ContentType = "breathing" | "meditation" | "sos";
export type MeditationGoal = "ansiedade" | "sono" | "foco" | "autoestima";

export interface BreathingPattern {
  inhale: number;
  hold1?: number;
  exhale: number;
  hold2?: number;
}

export interface ContentItem {
  id: string;
  type: ContentType;
  slug: string;
  title: string;
  description: string;
  durationSeconds: number;
  isFree: boolean;
  trackSlug?: string;
  levelIndex?: number;
  goal?: MeditationGoal;
  pattern?: BreathingPattern;
  audioUrl?: string;
}

export interface BreathingTrack {
  slug: string;
  title: string;
  description: string;
}

export const breathingTracks: BreathingTrack[] = [
  {
    slug: "4-7-8",
    title: "Respiração 4-7-8",
    description:
      "Clássica para acalmar rápido antes de dormir ou em momentos de tensão.",
  },
  {
    slug: "diafragmatica",
    title: "Respiração Diafragmática",
    description:
      "Respiração profunda pelo abdômen, base para todas as outras práticas.",
  },
  {
    slug: "box",
    title: "Box Breathing",
    description:
      "Respiração em quadrado, usada por atletas e militares para foco sob pressão.",
  },
];

export const contentItems: ContentItem[] = [
  {
    id: "breath-478-1",
    type: "breathing",
    slug: "478-nivel-1",
    title: "4-7-8 · Nível 1",
    description: "Introdução ao padrão 4-7-8, ritmo mais lento para aprender.",
    durationSeconds: 180,
    isFree: true,
    trackSlug: "4-7-8",
    levelIndex: 1,
    pattern: { inhale: 4, hold1: 7, exhale: 8 },
  },
  {
    id: "breath-478-2",
    type: "breathing",
    slug: "478-nivel-2",
    title: "4-7-8 · Nível 2",
    description: "Mais ciclos seguidos, para quem já sentiu o ritmo do nível 1.",
    durationSeconds: 300,
    isFree: false,
    trackSlug: "4-7-8",
    levelIndex: 2,
    pattern: { inhale: 4, hold1: 7, exhale: 8 },
  },
  {
    id: "breath-diaf-1",
    type: "breathing",
    slug: "diafragmatica-nivel-1",
    title: "Diafragmática · Nível 1",
    description: "Respiração lenta e profunda pelo abdômen.",
    durationSeconds: 180,
    isFree: true,
    trackSlug: "diafragmatica",
    levelIndex: 1,
    pattern: { inhale: 4, exhale: 6 },
  },
  {
    id: "breath-diaf-2",
    type: "breathing",
    slug: "diafragmatica-nivel-2",
    title: "Diafragmática · Nível 2",
    description: "Ciclos mais longos, mais controle da respiração.",
    durationSeconds: 300,
    isFree: false,
    trackSlug: "diafragmatica",
    levelIndex: 2,
    pattern: { inhale: 5, exhale: 7 },
  },
  {
    id: "breath-box-1",
    type: "breathing",
    slug: "box-nivel-1",
    title: "Box Breathing · Nível 1",
    description: "O quadrado clássico: inspira, segura, expira, segura.",
    durationSeconds: 180,
    isFree: true,
    trackSlug: "box",
    levelIndex: 1,
    pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
  },
  {
    id: "breath-box-2",
    type: "breathing",
    slug: "box-nivel-2",
    title: "Box Breathing · Nível 2",
    description: "Ritmo mais longo para quem já dominou o nível 1.",
    durationSeconds: 300,
    isFree: false,
    trackSlug: "box",
    levelIndex: 2,
    pattern: { inhale: 5, hold1: 5, exhale: 5, hold2: 5 },
  },
  {
    id: "med-ansiedade",
    type: "meditation",
    slug: "meditacao-ansiedade",
    title: "Acalmar a ansiedade",
    description: "Uma pausa curta para desacelerar pensamentos acelerados.",
    durationSeconds: 300,
    isFree: true,
    goal: "ansiedade",
  },
  {
    id: "med-sono",
    type: "meditation",
    slug: "meditacao-sono",
    title: "Preparar para dormir",
    description: "Relaxamento guiado para desligar o dia.",
    durationSeconds: 600,
    isFree: false,
    goal: "sono",
  },
  {
    id: "med-foco",
    type: "meditation",
    slug: "meditacao-foco",
    title: "Foco antes de começar",
    description: "Centrar a atenção antes de uma tarefa importante.",
    durationSeconds: 300,
    isFree: false,
    goal: "foco",
  },
  {
    id: "med-autoestima",
    type: "meditation",
    slug: "meditacao-autoestima",
    title: "Reconectar com você",
    description: "Prática de acolhimento e autoestima.",
    durationSeconds: 420,
    isFree: false,
    goal: "autoestima",
  },
  {
    id: "sos-emergencia",
    type: "sos",
    slug: "sos-emergencia",
    title: "SOS Ansiedade",
    description: "Respiração de emergência para os próximos 90 segundos.",
    durationSeconds: 90,
    isFree: true,
    pattern: { inhale: 4, hold1: 4, exhale: 6 },
  },
];

export function getContentById(id: string) {
  return contentItems.find((c) => c.id === id);
}

export function getTrackItems(trackSlug: string) {
  return contentItems
    .filter((c) => c.trackSlug === trackSlug)
    .sort((a, b) => (a.levelIndex ?? 0) - (b.levelIndex ?? 0));
}

export function getMeditationsByGoal(goal: MeditationGoal) {
  return contentItems.filter((c) => c.type === "meditation" && c.goal === goal);
}

export const meditationGoals: { slug: MeditationGoal; label: string }[] = [
  { slug: "ansiedade", label: "Ansiedade" },
  { slug: "sono", label: "Sono" },
  { slug: "foco", label: "Foco" },
  { slug: "autoestima", label: "Autoestima" },
];
