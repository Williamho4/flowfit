import styles from '@/styles/stats.module.css'
import ProgressBar from './progress-bar'

type StatsProps = {
  totalSets: number | undefined
  totalReps: number | undefined
  totalWeightLifted: number | undefined
  value: number
  maxValue: number
}

export default function Stats({
  totalSets,
  totalReps,
  totalWeightLifted,
  value,
  maxValue,
}: StatsProps) {
  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <p>{`Total sets done this workout: ${totalSets}`}</p>
        <p>{`Total reps done this workout: ${totalReps}`}</p>
        <p>{`Total weight lifted this workout: ${totalWeightLifted}`}</p>
      </div>
      <div className={styles.progress}>
        <ProgressBar value={value} maxValue={maxValue} />
      </div>
    </section>
  )
}
