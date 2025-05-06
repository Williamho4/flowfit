'use client'

import styles from '@/styles/base-exercise-card.module.css'
import { BaseExercise } from '@prisma/client'
import Image from 'next/image'
import image from '../../public/graypic.png'

type BaseExerciseCardProps = {
  exercise: BaseExercise
  onSelect?: (exercise: BaseExercise) => void
}

export default function BaseExerciseCard({
  exercise,
  onSelect,
}: BaseExerciseCardProps) {
  return (
    <section className={styles.card} onClick={() => onSelect?.(exercise)}>
      <div className={styles.card__info}>
        <h1 className={styles.card__name}>{exercise.name}</h1>
        <p className={styles.card__desc}>{exercise.description}</p>
        <p className={styles.card__category}>{exercise.category}</p>
      </div>
      <Image
        className={styles.card__image}
        width={70}
        height={70}
        src={exercise.imgUrl ? exercise.imgUrl : image}
        alt="exercise-pic"
      ></Image>
    </section>
  )
}
