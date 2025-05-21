import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import styles from '@/styles/dashboard-page.module.css'
import ThisWeekWorkoutList from '@/components/this-week-workout-list'
import {
  getThisWeeksWorkouts,
  getLast6WeeksWorkoutStats,
} from '@/lib/workout-server-utils'
import Link from 'next/link'
import Chart from '@/components/ui/bar-chart'

export default async function Page() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }
  const workouts = await getThisWeeksWorkouts(session.user.id)
  const stats = await getLast6WeeksWorkoutStats(session.user.id)

  return (
    <section className={styles.container}>
      {workouts.length <= 0 ? (
        <div className={styles['add-workout-container']}>
          <Link href={'/workout/add'} className={styles['add-workout-text']}>
            Add Workout Now
          </Link>
        </div>
      ) : (
        <ThisWeekWorkoutList workouts={workouts} />
      )}

      <div className={styles['chart-container']}>
        <p>Total Planned Workouts</p>
        <Chart data={stats} />
      </div>
    </section>
  )
}
