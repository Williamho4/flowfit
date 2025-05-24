import styles from '@/styles/selected-exercises-list.module.css'
import { BaseExercise } from '@prisma/client'
import FlipCard from './flip-card'
import BaseExerciseCard from './base-exercise-card'
import { Exercise } from '@/lib/types'
import ExerciseCard from '../id/exercise-card'
import SkeletonExerciseCard from './skeleton-exercise-card'

type selectedExerciseListProps = {
  workout: (BaseExercise | Exercise)[] | []
  handleDelete: (id: number) => void
}

export default function SelectedExercisesList({
  workout,
  handleDelete,
}: selectedExerciseListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {workout.length <= 0 && (
          <>
            <SkeletonExerciseCard />
          </>
        )}
        {workout.map((exercise) => (
          <FlipCard
            key={exercise.id}
            back={
              <button onClick={() => handleDelete(exercise.id)}>Remove</button>
            }
          >
            {'sets' in exercise ? (
              <ExerciseCard exercise={exercise} />
            ) : (
              <BaseExerciseCard exercise={exercise} />
            )}
          </FlipCard>
        ))}
      </ul>
    </div>
  )
}
