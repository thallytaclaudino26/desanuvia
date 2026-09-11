"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/home", label: "Início", icon: "🏠" },
  { href: "/library", label: "Biblioteca", icon: "📚" },
  { href: "/diary", label: "Diário", icon: "📝" },
  { href: "/profile", label: "Perfil", icon: "👤" },
];

export function BottomNav() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/onboarding") || pathname.startsWith("/sos")) {
    return null;
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-teal-900/10 bg-white/90 backdrop-blur dark:border-teal-100/10 dark:bg-neutral-950/90">
      <ul className="mx-auto flex max-w-md items-center justify-around py-2">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs ${
                  active
                    ? "text-teal-700 dark:text-teal-300"
                    : "text-neutral-500 dark:text-neutral-400"
                }`}
              >
                <span className="text-lg leading-none">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
