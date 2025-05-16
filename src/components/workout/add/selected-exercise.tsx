import styles from '@/styles/selected-exercise.module.css'
import { BaseExercise } from '@prisma/client'
import BaseExerciseCard from '../shared/base-exercise-card'

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
    <section className={styles.container}>
      {error && <h2 className={styles.selected__error}>{error}</h2>}
      {selectedExercise && !error ? (
        <>
          <BaseExerciseCard exercise={selectedExercise} classes={styles.card} />
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
