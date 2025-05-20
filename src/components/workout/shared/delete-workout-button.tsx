'use client'

import { deleteWorkout } from '@/lib/workout-server-utils'
import styles from '@/styles/delete-workout-button.module.css'
import { FaRegTrashAlt } from 'react-icons/fa'

type DeleteWorkoutButtonProps = {
  userId: number
  workoutId: number
}

export default function DeleteWorkoutButton({
  workoutId,
  userId,
}: DeleteWorkoutButtonProps) {
  return (
    <button
      onClick={() => deleteWorkout(userId, workoutId)}
      className={styles['delete-button']}
    >
      Delete Workout
      <FaRegTrashAlt />
    </button>
  )
}
