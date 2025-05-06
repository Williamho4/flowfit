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

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__lists}>
        <BaseExerciseList
          baseExercises={baseExercises}
          setSelected={setSelectedExercise}
        />
        <SelectedExercisesList />
      </div>
      <SelectedExercise selectedExercise={selectedExercise} />
    </div>
  )
}
