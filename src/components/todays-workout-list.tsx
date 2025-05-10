"use client";

import { Exercise, Workout } from "@/lib/types";
import ExerciseCard from "./exercise-card";
import styles from "@/styles/todays-workout-list.module.css";
import { useState } from "react";
import EditExerciseModal from "./edit-exercise-modal";

type TodaysWorkoutListProps = {
  workouts: Workout[] | undefined;
};

export default function TodaysWorkoutList({
  workouts,
}: TodaysWorkoutListProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  function toggleModal() {
    setSelectedExercise(null);
  }

  return (
    <div className={styles.container}>
      <EditExerciseModal
        selectedExercise={selectedExercise}
        onClose={toggleModal}
      ></EditExerciseModal>
      <div className={styles.workouts__list}>
        {workouts ? (
          <>
            Todays Workouts
            {workouts?.map((workout) => (
              <div key={workout.id} className={styles.list__container}>
                <h2>{workout.title}</h2>
                <ul className={styles.list}>
                  {workout.exercises.map((exercise) => (
                    <ExerciseCard
                      handleClick={setSelectedExercise}
                      key={exercise.id}
                      exercise={exercise}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </>
        ) : (
          <div>No workouts today</div>
        )}
      </div>
    </div>
  );
}
