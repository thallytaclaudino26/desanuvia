import Link from "next/link";
import { meditationGoals, getMeditationsByGoal } from "@/lib/content";

export default function MeditationsLibraryPage() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-8 px-5 pt-8">
      <h1 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
        Meditações
      </h1>
      {meditationGoals.map((goal) => (
        <section key={goal.slug} className="flex flex-col gap-2">
          <h2 className="text-lg font-medium text-teal-900 dark:text-teal-100">
            {goal.label}
          </h2>
          <div className="flex flex-col gap-2">
            {getMeditationsByGoal(goal.slug).map((item) => (
              <Link
                key={item.id}
                href={`/session/${item.id}`}
                className="flex items-center justify-between rounded-xl border border-teal-900/10 bg-white px-4 py-3 dark:border-teal-100/10 dark:bg-neutral-900"
              >
                <span className="text-teal-900 dark:text-teal-100">{item.title}</span>
                <span className="text-xs text-teal-700/60 dark:text-teal-300/60">
                  {item.isFree ? "Grátis" : "Premium"}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
