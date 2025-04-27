import { getWorkout } from '@/lib/server-utils'
import ExerciseCard from './exercise-card'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import '@/styles/exercise-list.css'

type WorkoutListProps = {
  workoutId: string
}

export default async function WorkoutList({ workoutId }: WorkoutListProps) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const response = await getWorkout(session?.user.id, parseInt(workoutId))
  const { data: workout } = response

  return (
    <>
      {!response.ok ? (
        <div>Could not find workout</div>
      ) : (
        <div className="exercise-list-container">
          <h1>{workout?.title}</h1>
          <ul className="exercise-list">
            {workout?.exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
              ></ExerciseCard>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
