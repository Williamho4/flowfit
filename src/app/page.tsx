import { getBaseExercises, getWorkouts } from '@/lib/server-utils'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  const { username } = session.user

  const { data: workouts, ok } = await getWorkouts(session.user.id)

  const { data: baseExercises, ok: baseExercisesOk } = await getBaseExercises()

  if (!baseExercisesOk) {
    console.error('no exercises')
  }

  console.log(baseExercises)

  return (
    <>
      <div>
        {`${username}'s Workout`}
        {workouts?.map((workout) => (
          <div key={workout.id}>
            <h1>{workout.title}</h1>
            {workout.exercises.map((exercise) => (
              <>
                <div>Sets {exercise.sets}</div>
                <div>Reps {exercise.reps}</div>
                <div>{exercise.baseExercise.name}</div>
              </>
            ))}
          </div>
        ))}
      </div>

      <div>
        {baseExercises?.map((exercise) => (
          <div
            key={exercise.id}
          >{`${exercise.category}, ${exercise.description}, ${exercise.name}`}</div>
        ))}
      </div>
    </>
  )
}
