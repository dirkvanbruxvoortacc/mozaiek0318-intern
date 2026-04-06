import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { HomeDashboard } from "@/components/HomeDashboard";

export default async function HomPage() {
  const session = await getServerSession(authOptions);

  return <HomeDashboard session={session} />;
}
