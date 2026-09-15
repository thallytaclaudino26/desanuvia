# DesanuvIA

App de saúde mental e bem-estar em português — respiração guiada, meditação e diário de humor, com trilhas adaptadas ao seu momento.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- [Supabase](https://supabase.com) — autenticação e dados (humor, progresso das sessões)
- Deploy: [Vercel](https://vercel.com)

## Desenvolvimento local

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). É necessário um arquivo `.env.local` com:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

O schema do banco fica em `supabase/migrations/`.

## Estrutura

- `src/app` — páginas (onboarding, home, biblioteca, sessão, diário, perfil, SOS)
- `src/lib/content.ts` — catálogo de trilhas de respiração e meditações
- `src/lib/storage.ts` — leitura/gravação de humor e progresso no Supabase
- `src/proxy.ts` — middleware de autenticação (protege rotas privadas)
