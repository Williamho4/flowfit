import { getWorkout } from "@/lib/server-utils";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import styles from "@/styles/workout-page.module.css";
import WorkoutEditor from "@/components/workout-editor";

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
    <div className={styles.container}>
      {res.data ? (
        <>
          <WorkoutEditor workout={res.data.exercises} />
        </>
      ) : (
        <div>Cant fint workout</div>
      )}
    </div>
  );
}
