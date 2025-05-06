'use client'

import styles from '@/styles/base-exercises-list.module.css'
import BaseExerciseCard from './base-exercise-card'
import { BaseExercise } from '@prisma/client'
import { Exercise } from '@/lib/types'

type BaseExerciseListProps = {
  baseExercises: BaseExercise[] | undefined
  setSelected: React.Dispatch<React.SetStateAction<BaseExercise | null>>
}

export default function BaseExerciseList({
  baseExercises,
  setSelected,
}: BaseExerciseListProps) {
  return (
    <>
      {baseExercises ? (
        <div className={styles.container}>
          <ul className={styles.list}>
            {baseExercises.map((exercise) => (
              <BaseExerciseCard
                onSelect={setSelected}
                key={exercise.id}
                exercise={exercise}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>Could not load base exercises</div>
      )}
    </>
  )
}
