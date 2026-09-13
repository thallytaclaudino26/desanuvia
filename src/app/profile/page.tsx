"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="mx-auto flex max-w-md flex-col gap-4 px-5 pt-8">
      <h1 className="text-2xl font-semibold text-teal-900 dark:text-teal-100">
        Perfil
      </h1>
      <div className="rounded-2xl border border-teal-900/10 bg-white px-5 py-5 dark:border-teal-100/10 dark:bg-neutral-900">
        <p className="text-sm text-teal-700/70 dark:text-teal-300/70">
          Conectado como
        </p>
        <p className="mt-1 font-medium text-teal-900 dark:text-teal-100">
          {email ?? "…"}
        </p>
      </div>
      <div className="rounded-2xl border border-teal-900/10 bg-white px-5 py-5 dark:border-teal-100/10 dark:bg-neutral-900">
        <p className="text-sm text-teal-700/70 dark:text-teal-300/70">
          Assinatura e notificações chegam na próxima fase.
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-full border border-teal-700 px-6 py-3 font-medium text-teal-700 dark:text-teal-200"
      >
        Sair da conta
      </button>
    </main>
  );
}
