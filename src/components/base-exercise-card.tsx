import { BaseExercise } from '@prisma/client'
import Image from 'next/image'
import '../styles/base-exercise-card.css'

type ExerciseCardProps = {
  exercise: BaseExercise
}

export default function BaseExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <section className="exercise-container">
      <div className="exercise-info">
        <h1>{exercise.name}</h1>
        <h4>{exercise.category}</h4>
        <p>{exercise.description}</p>
      </div>
      {exercise.imgUrl && (
        <Image
          className="exercise-image"
          src={exercise.imgUrl}
          width={100}
          height={100}
          alt="Picture of the author"
        ></Image>
      )}
    </section>
  )
}
