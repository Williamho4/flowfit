import WorkoutPlanner from "@/components/workout-planner";
import { getBaseExercises } from "@/lib/server-utils";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const res = await getBaseExercises();
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <WorkoutPlanner baseExercises={res.data} user={session?.user} />;
}
