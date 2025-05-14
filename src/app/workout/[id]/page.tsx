import { getWorkout } from '@/lib/server-utils'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import styles from '@/styles/workout-page.module.css'
import WorkoutEditor from '@/components/workout-editor'
import Stats from '@/components/stats'

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
  const totalSets = res.data?.exercises.reduce((acc, workout) => {
    return acc + workout.sets.length
  }, 0)
  const totalReps = res.data?.exercises.reduce((acc, workout) => {
    const setReps = workout.sets.reduce((acc, set) => {
      return acc + set.reps
    }, 0)
    return acc + setReps
  }, 0)
  const totalWeightLifted = res.data?.exercises.reduce((acc, workout) => {
    const setWeight = workout.sets.reduce((acc, set) => {
      return acc + set.reps * set.weight
    }, 0)

    return acc + setWeight
  }, 0)

  return (
    <>
      {res.data ? (
        <div className={styles.container}>
          <WorkoutEditor workout={res.data.exercises} />
          <Stats
            totalSets={totalSets}
            totalReps={totalReps}
            totalWeightLifted={totalWeightLifted}
          />
        </div>
      ) : (
        <div>Cant fint workout</div>
      )}
    </>
  )
}
