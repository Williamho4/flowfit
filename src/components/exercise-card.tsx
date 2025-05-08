import Image from "next/image";
import styles from "@/styles/exercise-card.module.css";
import image from "../../public/graypic.png";
import { Exercise } from "@/lib/types";

type ExerciseCardProps = {
  exercise: Exercise;
  handleClick: (exercise: Exercise) => void;
};

export default function ExerciseCard({
  exercise,
  handleClick,
}: ExerciseCardProps) {
  return (
    <section onClick={() => handleClick(exercise)} className={styles.card}>
      <div className={styles.card__info}>
        <h1 className={styles.card__name}>{exercise.baseExercise.name}</h1>
        <p className={styles.card__category}>
          {exercise.baseExercise.category}
        </p>
        <p className={styles.card__desc}>{exercise.baseExercise.description}</p>
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
  );
}
