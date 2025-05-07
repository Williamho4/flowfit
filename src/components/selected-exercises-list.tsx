import styles from "@/styles/selected-exercises-list.module.css";
import { BaseExercise } from "@prisma/client";
import BaseExerciseCard from "./base-exercise-card";

type selectedExerciseListProps = {
  workout: BaseExercise[] | [];
  handleDelete: (id: number) => void;
};

export default function SelectedExercisesList({
  workout,
  handleDelete,
}: selectedExerciseListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {workout.map((exercise) => (
          <div className={styles.wrapper} key={exercise.id}>
            <div className={styles.card}>
              <BaseExerciseCard exercise={exercise} classes={styles.front} />
              <div className={styles.back}>
                <button onClick={() => handleDelete(exercise.id)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
