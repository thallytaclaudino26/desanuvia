"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { flushPendingMoodEntry } from "@/lib/storage";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/home";

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    const supabase = createClient();

    if (mode === "signup") {
      const { error, data } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(traduzErro(error.message));
      } else if (!data.session) {
        setInfo("Conta criada! Confirme seu e-mail e depois entre com sua senha.");
        setMode("signin");
      } else {
        await flushPendingMoodEntry();
        router.replace(next);
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(traduzErro(error.message));
      } else {
        await flushPendingMoodEntry();
        router.replace(next);
        router.refresh();
      }
    }

    setLoading(false);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-8 px-6 py-10">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-teal-900 dark:text-teal-100">
          DesanuvIA
        </h1>
        <p className="mt-2 text-teal-800/80 dark:text-teal-200/80">
          {mode === "signin"
            ? "Entre para continuar de onde parou."
            : "Crie sua conta para salvar seu progresso na nuvem."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-teal-900 dark:text-teal-100">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-teal-900/10 bg-white px-3 py-2 text-base dark:border-teal-100/10 dark:bg-neutral-900"
            placeholder="voce@exemplo.com"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-teal-900 dark:text-teal-100">
          Senha
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg border border-teal-900/10 bg-white px-3 py-2 text-base dark:border-teal-100/10 dark:bg-neutral-900"
            placeholder="Mínimo 6 caracteres"
          />
        </label>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {info && <p className="text-sm text-teal-700 dark:text-teal-300">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-teal-700 px-8 py-3 font-medium text-white disabled:opacity-50"
        >
          {loading ? "Aguarde…" : mode === "signin" ? "Entrar" : "Criar conta"}
        </button>
      </form>

      <button
        onClick={() => {
          setMode(mode === "signin" ? "signup" : "signin");
          setError(null);
          setInfo(null);
        }}
        className="text-sm text-teal-700/70 underline dark:text-teal-300/70"
      >
        {mode === "signin"
          ? "Ainda não tem conta? Criar uma"
          : "Já tem conta? Entrar"}
      </button>
    </main>
  );
}

function traduzErro(message: string) {
  if (message.includes("Invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (message.includes("User already registered")) {
    return "Já existe uma conta com esse e-mail. Tente entrar.";
  }
  return message;
}
