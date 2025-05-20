import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import styles from '@/styles/dashboard-page.module.css'
import TodaysWorkoutList from '@/components/this-week-workout-list'
import { getThisWeeksWorkouts } from '@/lib/workout-server-utils'
import Link from 'next/link'

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }
  const workouts = await getThisWeeksWorkouts(session.user.id)

  return (
    <section className={styles.container}>
      {workouts.length <= 0 ? (
        <div className={styles['add-workout-container']}>
          <Link href={'/workout/add'} className={styles['add-workout-text']}>
            Add Workout Now
          </Link>
        </div>
      ) : (
        <TodaysWorkoutList workouts={workouts} />
      )}
    </section>
  )
}
