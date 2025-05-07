import MultiSteps from "@/components/multi-steps";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <MultiSteps></MultiSteps>;
}
