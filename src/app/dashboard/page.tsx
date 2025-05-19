import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import styles from "@/styles/dashboard-page.module.css";
import TodaysWorkoutList from "@/components/this-week-workout-list";
import { getThisWeeksWorkouts } from "@/lib/workout-server-utils";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  const workouts = await getThisWeeksWorkouts(session.user.id);

  return (
    <section className={styles.container}>
      <TodaysWorkoutList workouts={workouts} />
    </section>
  );
}
