import styles from '@/styles/workout-list.module.css'
import ExerciseCard from './workout/id/exercise-card'
import { Exercise } from '../lib/types'

type WorkoutListProps = {
  workout: Exercise[] | undefined
  handleClick: (exercise: Exercise) => void
}

export default function WorkoutList({
  workout,
  handleClick,
}: WorkoutListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {workout?.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            handleClick={handleClick}
            exercise={exercise}
          />
        ))}
      </ul>
    </div>
  )
}
