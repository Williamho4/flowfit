import { Exercise } from '@/lib/types'
import Image from 'next/image'
import '@/styles/exercise-card.css'

type ExerciseCardProps = {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <section className="exercise-container">
      <div className="exercise-info">
        <h1>{exercise.baseExercise.name}</h1>
        <h4>{exercise.baseExercise.category}</h4>
        <p>{exercise.baseExercise.description}</p>
      </div>
      <div className="exercise-info">
        {exercise.sets?.map((set) => (
          <p key={set.id}>{`Set ${set.id}: ${set.reps}`}</p>
        ))}
      </div>
      {exercise.baseExercise.imgUrl && (
        <Image
          className="exercise-image"
          src={exercise.baseExercise.imgUrl}
          width={100}
          height={100}
          alt="Picture of the author"
        ></Image>
      )}
    </section>
  )
}
