import { getContentById } from "@/lib/content";
import { SessionPlayer } from "@/components/SessionPlayer";

export default function SosPage() {
  const item = getContentById("sos-emergencia")!;
  return <SessionPlayer item={item} autoStart />;
}
