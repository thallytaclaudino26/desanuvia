// Princípios curtos de motivação e disciplina, escritos de forma original
// para o DesanuvIA. Um por dia, de forma estável (mesma dica o dia todo).

const tips: string[] = [
  "Onde você coloca sua atenção, coloca sua energia. Hoje, escolha prestar atenção no que você quer construir — não só nos problemas.",
  "Uma emoção elevada — gratidão, alegria, inspiração — muda seu corpo antes de mudar sua vida. Cultive uma delas por alguns minutos hoje.",
  "Gratidão antecipada é sentir agora o que você sentiria se já tivesse alcançado o que quer. Experimente sentir isso antes de pedir.",
  "Um hábito é só uma sequência repetida até virar automática. Trocar um hábito exige repetir o novo com a mesma constância.",
  "Disciplina não é motivação constante — é um compromisso simples, repetido no mesmo horário, mesmo sem vontade.",
  "Mudar de estado emocional leva dias, não um momento só. Continue praticando mesmo sem ver resultado imediato.",
  "Você pode ensaiar mentalmente quem quer ser antes de agir assim de verdade. A mente pratica mesmo parada.",
  "Escolha um momento comum do seu dia — uma fila, um trajeto — para agir como a pessoa que você está se tornando, não no automático.",
];

function dayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86_400_000);
}

export function getDailyTip(date: Date = new Date()): string {
  return tips[dayOfYear(date) % tips.length];
}
