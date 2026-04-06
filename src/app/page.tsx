import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginScreen } from "@/components/LoginScreen";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return <LoginScreen />;
}
