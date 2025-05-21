import { getWorkout } from '@/lib/workout-server-utils'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import styles from '@/styles/workout-page.module.css'
import WorkoutEditor from '@/components/workout/id/workout-editor'
import Stats from '@/components/ui/stats'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  const res = await getWorkout(session.user.id, Number(id))

  if (!res.data) {
    return redirect('/')
  }

  return (
    <>
      {res.data ? (
        <div className={styles.container}>
          <WorkoutEditor workout={res.data.exercises} />
          <Stats
            exercises={res.data.exercises}
            userId={session.user.id}
            workoutId={res.data.id}
          />
        </div>
      ) : (
        <div>Cant fint workout</div>
      )}
    </>
  )
}
