import styles from '@/styles/workout-list.module.css'
import ExerciseCard from './exercise-card'
import { Exercise } from '../lib/types'

type WorkoutListProps = {
  workout: Exercise[] | undefined
}

export default function WorkoutList({ workout }: WorkoutListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {workout?.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </ul>
    </div>
  )
}
