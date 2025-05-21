import styles from '@/styles/skeleton-exercise-card.module.css'

export default function SkeletonExerciseCard() {
  return (
    <section className={`${styles.card}`}>
      <div className={styles.card__info}>
        <div className={styles.card__name} />
        <div className={styles.card__category} />
        <div className={styles.card__desc} />
      </div>
      <div className={styles.card__image}></div>
    </section>
  )
}
