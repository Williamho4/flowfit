import Image from 'next/image'
import FlipCard from './flip-card'
import styles from '@/styles/exercise-card.module.css'
import image from '../../public/graypic.png'
import { Exercise } from '@/lib/types'
import ExerciseCardBack from './exercise-card-back'

type ExerciseCardProps = {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <FlipCard back={<ExerciseCardBack sets={exercise.sets} />}>
      <section className={styles.card}>
        <div className={styles.card__info}>
          <h1 className={styles.card__name}>{exercise.baseExercise.name}</h1>
          <p className={styles.card__category}>
            {exercise.baseExercise.category}
          </p>
          <p className={styles.card__desc}>
            {exercise.baseExercise.description}
          </p>
        </div>
        <Image
          className={styles.card__image}
          width={70}
          height={70}
          src={
            exercise.baseExercise.imgUrl ? exercise.baseExercise.imgUrl : image
          }
          alt="exercise-pic"
        />
      </section>
    </FlipCard>
  )
}
