import styles from '@/styles/stats.module.css'

type StatsProps = {
  totalSets: number | undefined
  totalReps: number | undefined
  totalWeightLifted: number | undefined
}

export default function Stats({
  totalSets,
  totalReps,
  totalWeightLifted,
}: StatsProps) {
  return (
    <section className={styles.container}>
      <p>{`Total sets done this workout: ${totalSets}`}</p>
      <p>{`Total reps done this workout: ${totalReps}`}</p>
      <p>{`Total weight lifted this workout: ${totalWeightLifted}`}</p>
    </section>
  )
}
