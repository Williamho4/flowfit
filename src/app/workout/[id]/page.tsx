import { getWorkout } from "@/lib/server-utils";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import WorkoutList from "@/components/workout-list";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const res = await getWorkout(session.user.id, Number(id));

  return (
    <>
      {res.data ? (
        <WorkoutList workout={res.data.exercises}></WorkoutList>
      ) : (
        <div>Cant fint workout</div>
      )}
    </>
  );
}
