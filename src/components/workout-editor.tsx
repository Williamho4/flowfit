'use client'

import styles from '@/styles/workout-editor.module.css'
import { Exercise } from '@/lib/types'
import EditExerciseModal from './edit-exercise-modal'
import WorkoutList from './workout-list'
import { useState } from 'react'

type WorkoutEditorProps = {
  workout: Exercise[] | undefined
}

export default function WorkoutEditor({ workout }: WorkoutEditorProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  )

  function toggleModal() {
    setSelectedExercise(null)
  }

  return (
    <div className={styles.container}>
      <WorkoutList
        workout={workout}
        handleClick={setSelectedExercise}
      ></WorkoutList>

      <EditExerciseModal
        selectedExercise={selectedExercise}
        onClose={toggleModal}
      ></EditExerciseModal>
    </div>
  )
}
