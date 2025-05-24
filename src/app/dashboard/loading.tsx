import { FC } from 'react'
import styles from './loading.module.css'

type SkeletonChartProps = {
  chartName: string
}

export default function loading() {
  return (
    <div className={styles.container}>
      <div className={styles['workout-container']}>
        <SkeletonWorkoutCard />
        <SkeletonWorkoutCard />
        <SkeletonWorkoutCard />
        <SkeletonWorkoutCard />
      </div>

      <SkeletonChart chartName={'Total Planned Workouts'} />
      <SkeletonChart chartName={'You vs Friends'} />
    </div>
  )
}

const SkeletonWorkoutCard: FC = () => {
  return (
    <div className={styles.workout}>
      <h1 className={styles['workout-header']}></h1>
      <p className={styles['workout-date']}></p>
      <div className={styles.workout__image__container}>
        <div className={styles.workout__image} />
        <div className={styles.workout__image} />
        <div className={styles.workout__image} />
      </div>
    </div>
  )
}

export const SkeletonChart: FC<SkeletonChartProps> = ({ chartName }) => {
  return (
    <div className={styles['chart-container']}>
      <p>{chartName}</p>
      <div className={styles['chart']} />
    </div>
  )
}
