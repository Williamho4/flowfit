import styles from './loading.module.css'

export default function loading() {
  return (
    <div className={styles.container}>
      <div className={styles['workout-container']}>
        <SkeletonWorkoutCard />
        <SkeletonWorkoutCard />
        <SkeletonWorkoutCard />
        <SkeletonWorkoutCard />
      </div>

      <div className={styles['chart-container']}>
        <p>Total Planned Workouts</p>
        <div className={styles['chart']} />
      </div>
    </div>
  )
}

const SkeletonWorkoutCard: React.FC = () => {
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
