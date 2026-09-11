import { notFound } from "next/navigation";
import { getContentById } from "@/lib/content";
import { SessionPlayer } from "@/components/SessionPlayer";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getContentById(id);
  if (!item) notFound();

  return <SessionPlayer item={item} />;
}
