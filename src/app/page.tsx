import { getAllWorkoutTitles, getTodaysWorkouts } from "@/lib/server-utils";
import { getSession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "@/styles/home-page.module.css";
import TodaysWorkoutList from "@/components/todays-workout-list";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  const workoutTitles = await getAllWorkoutTitles(session.user.id);
  const workouts = await getTodaysWorkouts(session.user.id);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {workoutTitles.length > 0 ? (
          <>
            {workoutTitles.map((workout) => (
              <Link key={workout.id} href={`/workout/${workout.id}`}>
                <li className={styles["list__item"]}>
                  <p>{workout.title} </p>
                  <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
                </li>
              </Link>
            ))}
          </>
        ) : (
          <Link style={{ textDecoration: "none" }} href="/workout/add">
            Add your first workout
          </Link>
        )}
      </ul>
      <TodaysWorkoutList workouts={workouts.data} />
    </section>
  );
}
