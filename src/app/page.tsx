"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isOnboardingDone } from "@/lib/storage";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(isOnboardingDone() ? "/home" : "/onboarding");
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-teal-50 dark:bg-neutral-950">
      <span className="text-2xl font-semibold text-teal-800 dark:text-teal-200">
        DesanuvIA
      </span>
      <span className="text-sm text-teal-700/70 dark:text-teal-300/70">
        Desanuvie a mente.
      </span>
    </main>
  );
}
