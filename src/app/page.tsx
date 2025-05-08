import MultiSteps from '@/components/multi-steps'
import WorkoutList from '@/components/workout-list'
import { getWorkout } from '@/lib/server-utils'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import styles from '@/styles/home-page.module.css'

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }
  const Workout = await getWorkout(session.user.id, 1)

  console.log(Workout.data?.exercises)

  if (!Workout.data?.exercises) {
    return null
  }

  return (
    <>
      {' '}
      {Workout && (
        <div className={styles.container}>
          <div className={styles.container__left}>
            <WorkoutList workout={Workout.data.exercises} />
            <WorkoutList workout={Workout.data.exercises} />
          </div>
          <div className={styles.container__right}>
            <WorkoutList workout={Workout.data.exercises} />
          </div>
        </div>
      )}
    </>
  )
}
