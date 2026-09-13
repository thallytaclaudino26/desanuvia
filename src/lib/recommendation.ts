import { contentItems, getContentById, type ContentItem } from "./content";
import { getMoodEntries, getProgress } from "./storage";

export async function getDailyRecommendation(): Promise<ContentItem> {
  const moods = await getMoodEntries();
  const progress = await getProgress();
  const completedIds = new Set(progress.map((p) => p.contentId));
  const lastMood = moods[0];

  if (lastMood && lastMood.score <= 2) {
    const sos = getContentById("sos-emergencia");
    if (sos) return sos;
  }

  if (lastMood && lastMood.score === 3) {
    const anxietyItem = contentItems.find((c) => c.goal === "ansiedade");
    if (anxietyItem) return anxietyItem;
  }

  const nextBreathing = contentItems.find(
    (c) => c.type === "breathing" && !completedIds.has(c.id)
  );
  if (nextBreathing) return nextBreathing;

  const hour = new Date().getHours();
  if (hour >= 20 || hour < 5) {
    const sleepItem = contentItems.find((c) => c.goal === "sono");
    if (sleepItem) return sleepItem;
  }

  return contentItems[0];
}
