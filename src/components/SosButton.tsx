"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SosButton() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/onboarding") || pathname.startsWith("/sos")) {
    return null;
  }

  return (
    <Link
      href="/sos"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition-transform active:scale-95"
    >
      SOS
    </Link>
  );
}
