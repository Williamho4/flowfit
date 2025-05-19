"use client";

import styles from "@/styles/this-week-workout-list.module.css";
import Image from "next/image";
import grayImage from "@/../public/graypic.png";
import { WorkoutWithoutSets } from "@/lib/types";
import Link from "next/link";

type TodaysWorkoutListProps = {
  workouts: WorkoutWithoutSets[];
};

export default function TodaysWorkoutList({
  workouts,
}: TodaysWorkoutListProps) {
  return (
    <div className={styles.container}>
      {workouts?.map((workout) => (
        <Link
          href={`/workout/${workout.id}`}
          key={workout.id}
          className={styles.workout}
        >
          <h1>{workout.title}</h1>
          <p>{workout.date.toLocaleDateString()}</p>
          <div className={styles.workout__image__container}>
            {workout.exercises.map((exercise) => (
              <div key={exercise.id}>
                <Image
                  className={styles.workout__image}
                  src={
                    exercise.baseExercise.imgUrl
                      ? exercise.baseExercise.imgUrl
                      : grayImage
                  }
                  width={60}
                  height={60}
                  alt="exercise-image"
                />
              </div>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}
