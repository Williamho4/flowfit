import { Set } from "@/lib/types";
import styles from "@/styles/exercise-card-back.module.css";

type ExerciseCardBackProps = {
  sets: Set[] | undefined;
};

export default function ExerciseCardBack({}: ExerciseCardBackProps) {
  return <section className={styles.card}>hello</section>;
}
