import styles from '@/styles/selected-exercise.module.css'
import BaseExerciseCard from './base-exercise-card'
import { BaseExercise } from '@prisma/client'

type SelecetedExerciseProps = {
  selectedExercise: BaseExercise | null
  setSelected: React.Dispatch<React.SetStateAction<BaseExercise | null>>
  handleAddExercise: (exercise: BaseExercise) => void
}

export default function SelectedExercise({
  selectedExercise,
  setSelected,
  handleAddExercise,
}: SelecetedExerciseProps) {
  return (
    <section className={styles.selected}>
      {selectedExercise ? (
        <>
          <BaseExerciseCard exercise={selectedExercise} />
          <button
            className={styles.selected__button}
            onClick={() => {
              handleAddExercise(selectedExercise)
              setSelected(null)
            }}
          >
            Add
          </button>
        </>
      ) : (
        <div>Select an exercise</div>
      )}
    </section>
  )
}
