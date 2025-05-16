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

  const totalSets = res.data?.exercises.reduce((acc, exercise) => {
    return acc + exercise.sets.length
  }, 0)

  const totalReps = res.data?.exercises.reduce((acc, exercise) => {
    const setReps = exercise.sets.reduce((acc, set) => {
      return acc + set.reps
    }, 0)
    return acc + setReps
  }, 0)

  const totalWeightLifted = res.data?.exercises.reduce((acc, exercise) => {
    const setWeight = exercise.sets.reduce((acc, set) => {
      return acc + set.reps * set.weight
    }, 0)

    return acc + setWeight
  }, 0)

  const doneExercises = res.data?.exercises.reduce((acc, exercise) => {
    if (exercise.sets.length > 0) {
      return acc + 1
    } else return acc
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
            value={doneExercises ? doneExercises : 0}
            maxValue={res.data.exercises.length ? res.data.exercises.length : 0}
          />
        </div>
      ) : (
        <div>Cant fint workout</div>
      )}
    </>
  )
}
