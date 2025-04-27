import BaseExerciseList from '@/components/base-exercise-list'
import WorkoutList from '@/components/workout-list'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <BaseExerciseList />
    </div>
  )
}
