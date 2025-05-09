import { getAllWorkoutTitles } from '@/lib/server-utils'
import { getSession } from '@/lib/session'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }
  const workoutTitles = await getAllWorkoutTitles(session.user.id)

  return (
    <>
      {workoutTitles.length > 0 && (
        <ul>
          {workoutTitles.map((workout) => (
            <Link key={workout.id} href={`/workout/${workout.id}`}>
              <li>
                {workout.title} Date{' '}
                {new Date(workout.date).toLocaleDateString()}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  )
}
