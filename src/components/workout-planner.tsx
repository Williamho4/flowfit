"use client";

import styles from "@/styles/workout-planner.module.css";
import BaseExerciseList from "@/components/base-exercise-list";
import SelectedExercisesList from "@/components/selected-exercises-list";
import SelectedExercise from "./selected-exercise";
import { BaseExercise } from "@prisma/client";
import { useState } from "react";

type WorkoutPlannerProps = {
  baseExercises: BaseExercise[] | undefined;
};

export default function WorkoutPlanner({ baseExercises }: WorkoutPlannerProps) {
  const [selectedExercise, setSelectedExercise] = useState<BaseExercise | null>(
    null
  );
  const [workout, setWorkout] = useState<BaseExercise[] | []>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddExercise = (exercise: BaseExercise) => {
    if (workout.some((e) => e.id === exercise.id)) {
      return setError("Exercise already added");
    }

    setWorkout((prev) => [...prev, exercise]);
  };

  const handleDeleteExercise = (id: number) => {
    setWorkout((prev) => prev.filter((exercise) => exercise.id !== id));
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__lists}>
        <BaseExerciseList
          baseExercises={baseExercises}
          setSelected={setSelectedExercise}
          setError={setError}
        />
        <SelectedExercisesList
          workout={workout}
          handleDelete={(id) => handleDeleteExercise(id)}
        />
      </div>
      <div className={styles.dashboard__actions}>
        <SelectedExercise
          selectedExercise={selectedExercise}
          handleAddExercise={handleAddExercise}
          setSelected={setSelectedExercise}
          error={error}
        />
        <div className={styles.dashboard__form}>
          <form action="" className={styles.dashboard__inputs}>
            <input type="text" />
            <input type="date" />
            <input type="text" />
          </form>
        </div>
      </div>
    </div>
  );
}
