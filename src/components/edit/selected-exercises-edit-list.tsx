import styles from "@/styles/selected-exercises-list.module.css";
import { BaseExercise } from "@prisma/client";
import BaseExerciseCard from "../workout/shared/base-exercise-card";
import FlipCard from "../workout/shared/flip-card";

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
          <FlipCard
            key={exercise.id}
            back={
              <button onClick={() => handleDelete(exercise.id)}>Remove</button>
            }
          >
            <BaseExerciseCard exercise={exercise} />
          </FlipCard>
        ))}
      </ul>
    </div>
  );
}
