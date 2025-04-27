import { getBaseExercises } from '@/lib/server-utils'

import '../styles/base-exercise-list.css'
import BaseExerciseCard from './base-exercise-card'

export default async function BaseExerciseList() {
  const baseExercises = await getBaseExercises()

  console.log(baseExercises.ok)

  return (
    <>
      {!baseExercises.ok ? (
        <div>Could not load exercises</div>
      ) : (
        <div className="exercise-list-container">
          <ul className="exercise-list">
            {baseExercises.data?.map((exercise) => (
              <BaseExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
