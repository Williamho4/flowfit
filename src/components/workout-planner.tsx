'use client'

import styles from '@/styles/workout-planner.module.css'
import BaseExerciseList from '@/components/base-exercise-list'
import SelectedExercisesList from '@/components/selected-exercises-list'
import SelectedExercise from './selected-exercise'
import { BaseExercise } from '@prisma/client'
import { useState } from 'react'

type WorkoutPlannerProps = {
  baseExercises: BaseExercise[] | undefined
}

export default function WorkoutPlanner({ baseExercises }: WorkoutPlannerProps) {
  const [selectedExercise, setSelectedExercise] = useState<BaseExercise | null>(
    null
  )
  const [workout, setWorkout] = useState<BaseExercise[] | []>([])
  const [error, setError] = useState<string | null>(null)

  const handleAddExercise = (exercise: BaseExercise) => {
    setError(null)

    if (workout.some((e) => e.id === exercise.id)) {
      return setError('Exercise already added')
    }

    setWorkout((prev) => [...prev, exercise])
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__lists}>
        <BaseExerciseList
          baseExercises={baseExercises}
          setSelected={setSelectedExercise}
        />
        <SelectedExercisesList workout={workout} />
      </div>
      {error && <h2 className={styles.dashboard__error}>{error}</h2>}
      <div className={styles.dashboard__actions}>
        <SelectedExercise
          selectedExercise={selectedExercise}
          handleAddExercise={handleAddExercise}
          setSelected={setSelectedExercise}
        />
        <div className={styles.dashboard__form}>
          <form action="" className={styles.dashboard__inputs}>
            <input type="text" />
            <input type="date" />
            <input type="text" />
          </form>
        </div>
      </div>
    </div>
  )
}
