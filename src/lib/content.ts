export type ContentType = "breathing" | "meditation" | "sos";
export type MeditationGoal =
  | "ansiedade"
  | "sono"
  | "foco"
  | "autoestima"
  | "visualizacao"
  | "disciplina";

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
  {
    slug: "coerencia-cardiaca",
    title: "Coerência Cardíaca",
    description:
      "Respiração lenta e ritmada a partir do peito, para cultivar uma emoção elevada de forma sustentada.",
  },
  {
    slug: "nadi-shodhana",
    title: "Respiração Alternada (Nadi Shodhana)",
    description:
      "Alterna a respiração entre as narinas para equilibrar o sistema nervoso e acalmar a mente.",
  },
  {
    slug: "ujjayi",
    title: "Respiração Oceânica (Ujjayi)",
    description:
      "Respiração lenta e audível, com uma leve contração na garganta, usada para acalmar e ajudar a dormir.",
  },
  {
    slug: "bhramari",
    title: "Respiração da Abelha (Bhramari)",
    description:
      "Expiração prolongada em um zumbido suave — uma das formas mais rápidas de acalmar o sistema nervoso.",
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
    description:
      "Relaxamento guiado para desligar o dia. Praticar em ambiente com pouca luz ajuda o corpo a liberar melatonina, o hormônio que regula o sono.",
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
    id: "breath-coer-1",
    type: "breathing",
    slug: "coerencia-nivel-1",
    title: "Coerência Cardíaca · Nível 1",
    description: "Introdução ao ritmo de 5 segundos inspirando, 5 segundos expirando.",
    durationSeconds: 180,
    isFree: true,
    trackSlug: "coerencia-cardiaca",
    levelIndex: 1,
    pattern: { inhale: 5, exhale: 5 },
  },
  {
    id: "breath-coer-2",
    type: "breathing",
    slug: "coerencia-nivel-2",
    title: "Coerência Cardíaca · Nível 2",
    description: "Ciclos mais longos, sustentando a atenção no peito e a emoção cultivada.",
    durationSeconds: 300,
    isFree: false,
    trackSlug: "coerencia-cardiaca",
    levelIndex: 2,
    pattern: { inhale: 5, exhale: 5 },
  },
  {
    id: "breath-nadi-1",
    type: "breathing",
    slug: "nadi-shodhana-nivel-1",
    title: "Nadi Shodhana · Nível 1",
    description:
      "Tampe delicadamente uma narina de cada vez, alternando a respiração em um ritmo calmo.",
    durationSeconds: 180,
    isFree: true,
    trackSlug: "nadi-shodhana",
    levelIndex: 1,
    pattern: { inhale: 4, exhale: 6 },
  },
  {
    id: "breath-nadi-2",
    type: "breathing",
    slug: "nadi-shodhana-nivel-2",
    title: "Nadi Shodhana · Nível 2",
    description: "Ciclos mais longos de respiração alternada, sustentando a atenção no ritmo.",
    durationSeconds: 300,
    isFree: false,
    trackSlug: "nadi-shodhana",
    levelIndex: 2,
    pattern: { inhale: 5, exhale: 7 },
  },
  {
    id: "breath-ujjayi-1",
    type: "breathing",
    slug: "ujjayi-nivel-1",
    title: "Ujjayi · Nível 1",
    description:
      "Inspire e expire pelo nariz com uma leve contração na garganta, criando um som suave como o do mar.",
    durationSeconds: 180,
    isFree: true,
    trackSlug: "ujjayi",
    levelIndex: 1,
    pattern: { inhale: 4, exhale: 6 },
  },
  {
    id: "breath-ujjayi-2",
    type: "breathing",
    slug: "ujjayi-nivel-2",
    title: "Ujjayi · Nível 2",
    description:
      "Expiração mais longa que a inspiração — uma variação usada antes de dormir, inclusive deitada.",
    durationSeconds: 300,
    isFree: false,
    trackSlug: "ujjayi",
    levelIndex: 2,
    pattern: { inhale: 4, exhale: 8 },
  },
  {
    id: "breath-bhramari-1",
    type: "breathing",
    slug: "bhramari-nivel-1",
    title: "Bhramari · Nível 1",
    description:
      "Inspire normalmente e solte o ar em um zumbido suave, como o de uma abelha, com a boca fechada.",
    durationSeconds: 180,
    isFree: true,
    trackSlug: "bhramari",
    levelIndex: 1,
    pattern: { inhale: 4, exhale: 6 },
  },
  {
    id: "breath-bhramari-2",
    type: "breathing",
    slug: "bhramari-nivel-2",
    title: "Bhramari · Nível 2",
    description: "Ciclos mais longos de zumbido, sustentando o som e a atenção na vibração.",
    durationSeconds: 300,
    isFree: false,
    trackSlug: "bhramari",
    levelIndex: 2,
    pattern: { inhale: 4, exhale: 9 },
  },
  {
    id: "med-sintonizar-potencial",
    type: "meditation",
    slug: "sintonizar-potencial",
    title: "Sintonizar um novo potencial",
    description:
      "Visualize com antecedência a versão de você que já viveu essa mudança, sentindo agora a emoção de tê-la alcançado.",
    durationSeconds: 900,
    isFree: false,
    goal: "visualizacao",
  },
  {
    id: "med-filme-mental",
    type: "meditation",
    slug: "filme-mental-futuro",
    title: "Filme mental do futuro",
    description:
      "Monte mentalmente cenas curtas do futuro que você quer viver, associando cada uma a uma emoção elevada.",
    durationSeconds: 600,
    isFree: false,
    goal: "visualizacao",
  },
  {
    id: "med-bencao-centros",
    type: "meditation",
    slug: "bencao-centros-energia",
    title: "Bênção dos centros de energia",
    description:
      "Percorra a atenção por diferentes regiões do corpo, uma de cada vez, soltando a tensão acumulada em cada uma.",
    durationSeconds: 1200,
    isFree: false,
    goal: "disciplina",
  },
  {
    id: "med-caminhando",
    type: "meditation",
    slug: "meditacao-caminhando",
    title: "Meditação caminhando",
    description:
      "Comece parada cultivando uma emoção elevada e uma intenção clara; depois caminhe devagar levando essa sensação para o corpo em movimento.",
    durationSeconds: 600,
    isFree: false,
    goal: "disciplina",
  },
  {
    id: "med-personificacao",
    type: "meditation",
    slug: "ser-quem-voce-quer-ser",
    title: "Ser quem você quer ser, agora",
    description:
      "Escolha um momento comum do seu dia — uma fila, o trânsito, um trajeto a pé — para conscientemente agir e sentir como a pessoa que você está se tornando.",
    durationSeconds: 90,
    isFree: true,
    goal: "disciplina",
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
  { slug: "visualizacao", label: "Visualização" },
  { slug: "disciplina", label: "Disciplina" },
];
