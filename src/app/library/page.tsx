import Link from "next/link";

export default function LibraryPage() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-5 pt-8">
      <h1 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
        Biblioteca
      </h1>
      <Link
        href="/library/breathing"
        className="rounded-2xl border border-teal-900/10 bg-white px-5 py-5 dark:border-teal-100/10 dark:bg-neutral-900"
      >
        <span className="text-lg font-semibold text-teal-900 dark:text-teal-100">
          Respiração
        </span>
        <p className="text-sm text-teal-700/70 dark:text-teal-300/70">
          Trilhas progressivas, do iniciante ao avançado.
        </p>
      </Link>
      <Link
        href="/library/meditacoes"
        className="rounded-2xl border border-teal-900/10 bg-white px-5 py-5 dark:border-teal-100/10 dark:bg-neutral-900"
      >
        <span className="text-lg font-semibold text-teal-900 dark:text-teal-100">
          Meditações
        </span>
        <p className="text-sm text-teal-700/70 dark:text-teal-300/70">
          Sessões curtas por objetivo: ansiedade, sono, foco, autoestima.
        </p>
      </Link>
    </main>
  );
}
