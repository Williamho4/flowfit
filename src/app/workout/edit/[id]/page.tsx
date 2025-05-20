import { getBaseExercises, getWorkout } from "@/lib/workout-server-utils";
import { getSession } from "@/lib/session";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import EditWorkoutPlanner from "@/components/edit/edit-workout-planner";

export const metadata: Metadata = {
  title: "FlowFit - Workout Planner",
  description: "Edit workout",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const res = await getBaseExercises();
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const workout = await getWorkout(session?.user.id, Number(id));

  if (!workout.data) {
    redirect("/");
  }

  return (
    <EditWorkoutPlanner
      baseExercises={res.data}
      user={session?.user}
      oldWorkout={workout.data}
    />
  );
}
