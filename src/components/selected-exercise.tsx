import styles from '@/styles/selected-exercise.module.css'
import BaseExerciseCard from './base-exercise-card'
import { BaseExercise } from '@prisma/client'

type SelecetedExerciseProps = {
  selectedExercise: BaseExercise | null
}

export default function SelectedExercise({
  selectedExercise,
}: SelecetedExerciseProps) {
  return (
    <section className={styles.selected}>
      {selectedExercise ? (
        <>
          <BaseExerciseCard exercise={selectedExercise} />
          <button className={styles.selected__button}>Add</button>
        </>
      ) : (
        <div>Select an exercise</div>
      )}
    </section>
  )
}
