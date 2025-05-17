import styles from "@/styles/stats.module.css";
import ProgressBar from "./progress-bar";
import { calculateCaloriesBurnt } from "@/lib/ai-utils";
import { Exercise } from "@/lib/types";

type StatsProps = {
  exercises: Exercise[];
};

export default async function Stats({ exercises }: StatsProps) {
  const exerciseNameAndSets = exercises.map((exercise) => ({
    name: exercise.baseExercise.name,
    sets: exercise.sets.map((set) => ({ reps: set.reps, weight: set.weight })),
  }));
  const caloriesBurnt = await calculateCaloriesBurnt(exerciseNameAndSets);

  const totalSets = exercises.reduce((acc, exercise) => {
    return acc + exercise.sets.length;
  }, 0);

  const totalReps = exercises.reduce((acc, exercise) => {
    const setReps = exercise.sets.reduce((acc, set) => {
      return acc + set.reps;
    }, 0);
    return acc + setReps;
  }, 0);

  const totalWeightLifted = exercises.reduce((acc, exercise) => {
    const setWeight = exercise.sets.reduce((acc, set) => {
      return acc + set.reps * set.weight;
    }, 0);

    return acc + setWeight;
  }, 0);

  const doneExercises = exercises.reduce((acc, exercise) => {
    if (exercise.sets.length > 0) {
      return acc + 1;
    } else return acc;
  }, 0);

  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <p>{`Total Estimated Calories Burnt: ${caloriesBurnt}`}</p>
        <p>{`Total sets done this workout: ${totalSets}`}</p>
        <p>{`Total reps done this workout: ${totalReps}`}</p>
        <p>{`Total weight lifted this workout: ${totalWeightLifted}`}</p>
      </div>
      <div className={styles.progress}>
        <ProgressBar
          value={doneExercises ? doneExercises : 0}
          maxValue={exercises.length}
        />
      </div>
    </section>
  );
}
