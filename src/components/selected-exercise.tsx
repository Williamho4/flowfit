import styles from '@/styles/selected-exercise.module.css'
import BaseExerciseCard from './base-exercise-card'
import { BaseExercise } from '@prisma/client'

type SelecetedExerciseProps = {
  selectedExercise: BaseExercise | null
  setSelected: React.Dispatch<React.SetStateAction<BaseExercise | null>>
  error: string | null
  handleAddExercise: (exercise: BaseExercise) => void
}

export default function SelectedExercise({
  selectedExercise,
  setSelected,
  handleAddExercise,
  error,
}: SelecetedExerciseProps) {
  return (
    <section className={styles.selected}>
      {error && <h2 className={styles.selected__error}>{error}</h2>}
      {selectedExercise && !error ? (
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
        <>{!error && <div>Select an exercise</div>}</>
      )}
    </section>
  )
}
