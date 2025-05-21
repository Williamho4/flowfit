import styles from '@/styles/stats.module.css'
import ProgressBar from './progress-bar'
import { calculateCaloriesBurnt } from '@/lib/ai-utils'
import { Exercise } from '@/lib/types'
import DeleteWorkoutButton from '../workout/shared/delete-workout-button'
import { FaRegEdit } from 'react-icons/fa'
import Link from 'next/link'
import { FC, Suspense } from 'react'

type StatsProps = {
  exercises: Exercise[]
  userId: number
  workoutId: number
}

type StatsInfoProps = {
  exercises: Exercise[]
}

export default function Stats({ exercises, userId, workoutId }: StatsProps) {
  const doneExercises = exercises.reduce((acc, exercise) => {
    if (exercise.sets.length > 0) {
      return acc + 1
    } else return acc
  }, 0)

  return (
    <section className={styles.container}>
      <div className={styles['button-container']}>
        <DeleteWorkoutButton userId={userId} workoutId={workoutId} />
        <Link href={`/workout/edit/${workoutId}`} className={styles.link}>
          <button className={styles['edit-button']}>
            Edit Workout
            <FaRegEdit />
          </button>
        </Link>
      </div>
      <Suspense
        fallback={<section className={styles.info}>Loading...</section>}
      >
        <StatsInfo exercises={exercises} />
      </Suspense>
      <div className={styles.progress}>
        <ProgressBar
          value={doneExercises ? doneExercises : 0}
          maxValue={exercises.length}
        />
      </div>
    </section>
  )
}

const StatsInfo: FC<StatsInfoProps> = async ({ exercises }: StatsInfoProps) => {
  const exerciseNameAndSets = exercises.map((exercise) => ({
    name: exercise.baseExercise.name,
    sets: exercise.sets.map((set) => ({ reps: set.reps, weight: set.weight })),
  }))
  const caloriesBurnt = await calculateCaloriesBurnt(exerciseNameAndSets)

  const totalSets = exercises.reduce((acc, exercise) => {
    return acc + exercise.sets.length
  }, 0)

  const totalReps = exercises.reduce((acc, exercise) => {
    const setReps = exercise.sets.reduce((acc, set) => {
      return acc + set.reps
    }, 0)
    return acc + setReps
  }, 0)

  const totalWeightLifted = exercises.reduce((acc, exercise) => {
    const setWeight = exercise.sets.reduce((acc, set) => {
      return acc + set.reps * set.weight
    }, 0)

    return acc + setWeight
  }, 0)

  return (
    <div className={styles.info}>
      <p>{`Total Estimated Calories Burnt: ${caloriesBurnt}`}</p>
      <p>{`Total sets done this workout: ${totalSets}`}</p>
      <p>{`Total reps done this workout: ${totalReps}`}</p>
      <p>{`Total weight lifted this workout: ${totalWeightLifted}`}</p>
    </div>
  )
}
