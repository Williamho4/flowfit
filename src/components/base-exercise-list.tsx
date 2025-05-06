'use client'

import styles from '@/styles/base-exercises-list.module.css'
import BaseExerciseCard from './base-exercise-card'
import { BaseExercise } from '@prisma/client'
import { useState } from 'react'

type BaseExerciseListProps = {
  baseExercises: BaseExercise[] | undefined
  setSelected: React.Dispatch<React.SetStateAction<BaseExercise | null>>
}

export default function BaseExerciseList({
  baseExercises,
  setSelected,
}: BaseExerciseListProps) {
  const [filteredExercises, setFilteredExercises] = useState(baseExercises)

  const handleChange = (e: string) => {
    if (e === 'All') {
      return setFilteredExercises(baseExercises)
    }

    setFilteredExercises(
      baseExercises?.filter((exercise) => exercise.category === e)
    )
  }

  return (
    <>
      {baseExercises ? (
        <div className={styles.container}>
          <select
            onChange={(e) => handleChange(e.target.value)}
            className={styles.filter}
          >
            <option value="All">All</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Biceps">Biceps</option>
            <option value="Triceps">Triceps</option>
          </select>
          <ul className={styles.list}>
            {filteredExercises?.map((exercise) => (
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
