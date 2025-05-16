'use client'

import styles from '@/styles/workout-planner.module.css'
import BaseExerciseList from '@/components/workout/add/base-exercise-list'

import { BaseExercise } from '@prisma/client'
import { useState } from 'react'
import { UserInfo } from '@/lib/types'
import CreateWorkoutForm from './create-workout-form'
import SelectedExercisesList from './selected-exercises-list'
import SelectedExercise from './selected-exercise'

type WorkoutPlannerProps = {
  baseExercises: BaseExercise[] | undefined
  user: UserInfo
}

export default function WorkoutPlanner({
  baseExercises,
  user,
}: WorkoutPlannerProps) {
  const [selectedExercise, setSelectedExercise] = useState<BaseExercise | null>(
    null
  )
  const [workout, setWorkout] = useState<BaseExercise[] | []>([])
  const [exerciseError, setExerciseError] = useState<string | null>(null)

  const handleAddExercise = (exercise: BaseExercise) => {
    if (workout.some((e) => e.id === exercise.id)) {
      return setExerciseError('Exercise already added')
    }

    setWorkout((prev) => [...prev, exercise])
  }

  const handleDeleteExercise = (id: number) => {
    setWorkout((prev) => prev.filter((exercise) => exercise.id !== id))
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles['item-1']}>
        <BaseExerciseList
          baseExercises={baseExercises}
          setSelected={setSelectedExercise}
          setError={setExerciseError}
        />
      </div>
      <div className={styles['item-2']}>
        <SelectedExercisesList
          workout={workout}
          handleDelete={(id) => handleDeleteExercise(id)}
        />
      </div>
      <div className={styles['item-3']}>
        <SelectedExercise
          selectedExercise={selectedExercise}
          handleAddExercise={handleAddExercise}
          setSelected={setSelectedExercise}
          error={exerciseError}
        />
      </div>
      <div className={styles['item-4']}>
        <CreateWorkoutForm
          setWorkout={setWorkout}
          workout={workout}
          user={user}
        />
      </div>
    </div>
  )
}
