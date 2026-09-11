export default function ProfilePage() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-5 pt-8">
      <h1 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
        Perfil
      </h1>
      <div className="rounded-2xl border border-teal-900/10 bg-white px-5 py-5 dark:border-teal-100/10 dark:bg-neutral-900">
        <p className="text-sm text-teal-700/70 dark:text-teal-300/70">
          Login, assinatura e notificações chegam na próxima fase, quando
          conectarmos o banco de dados.
        </p>
      </div>
    </main>
  );
}
