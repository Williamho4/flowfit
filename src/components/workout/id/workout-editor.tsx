'use client'

import styles from '@/styles/workout-editor.module.css'
import { Exercise } from '@/lib/types'
import { useState } from 'react'
import WorkoutList from '@/components/workout-list'
import EditExerciseModal from './edit-exercise-modal'

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
