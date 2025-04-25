import { getWorkouts } from '@/lib/server-utils'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  const { username } = session.user

  const { data, ok } = await getWorkouts(session.user.id)

  return (
    <div>
      {`${username}'s Workout`}
      {data?.map((workout) => (
        <div key={workout.id}>
          {workout.title}
          {workout.exercises.map((exercise) => (
            <div key={exercise.id}>
              {`Reps: ${exercise.reps} Sets: ${exercise.sets}`}
              {exercise.exercise.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
