import styles from '@/styles/selected-exercises-list.module.css'
import { BaseExercise } from '@prisma/client'
import BaseExerciseCard from './base-exercise-card'

type selectedExerciseListProps = {
  workout: BaseExercise[] | []
}

export default function SelectedExercisesList({
  workout,
}: selectedExerciseListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {workout.map((exercise, index) => (
          <BaseExerciseCard
            key={`${exercise.id}-${index}`}
            exercise={exercise}
          />
        ))}
      </ul>
    </div>
  )
}
