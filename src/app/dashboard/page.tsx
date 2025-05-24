import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import styles from '@/styles/dashboard-page.module.css'
import ThisWeekWorkoutList from '@/components/this-week-workout-list'
import {
  getThisWeeksWorkouts,
  getLast6WeeksWorkoutStats,
  getFriendStatsFromThisWeek,
} from '@/lib/workout-server-utils'
import Link from 'next/link'
import Chart from '@/components/ui/bar-chart'
import { FC, Suspense } from 'react'
import { SkeletonChart } from './loading'

type PlannedWorkoutsChartProps = {
  stats: Promise<
    {
      name: string
      Workouts: number
    }[]
  >
}

type FriendsWorkoutChartProps = {
  stats: Promise<
    {
      name: string
      Workouts: number
    }[]
  >
}

export default async function Page() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  const workouts = await getThisWeeksWorkouts(session.user.id)
  const stats = getLast6WeeksWorkoutStats(session.user.id)
  const friendStats = getFriendStatsFromThisWeek(session.user.id)

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
      <Suspense
        fallback={<SkeletonChart chartName={'Total Planned Workouts'} />}
      >
        <PlannedWorkoutsChart stats={stats} />
      </Suspense>
      <Suspense fallback={<SkeletonChart chartName={'You vs Friends'} />}>
        <FriendsWorkoutChart stats={friendStats} />
      </Suspense>
    </section>
  )
}

const PlannedWorkoutsChart: FC<PlannedWorkoutsChartProps> = async ({
  stats,
}) => {
  return (
    <div className={styles['chart-container']}>
      <p>Total Planned Workouts</p>
      <Chart data={await stats} />
    </div>
  )
}

const FriendsWorkoutChart: FC<FriendsWorkoutChartProps> = async ({ stats }) => {
  return (
    <div className={styles['chart-container']}>
      <p>You vs Friends</p>
      <Chart data={await stats} />
    </div>
  )
}
