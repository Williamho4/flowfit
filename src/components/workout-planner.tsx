"use client";

import styles from "@/styles/workout-planner.module.css";
import BaseExerciseList from "@/components/base-exercise-list";
import SelectedExercisesList from "@/components/selected-exercises-list";
import SelectedExercise from "./selected-exercise";
import { BaseExercise } from "@prisma/client";
import { useState } from "react";
import { UserInfo } from "@/lib/types";
import CreateWorkoutForm from "./create-workout-form";

type WorkoutPlannerProps = {
  baseExercises: BaseExercise[] | undefined;
  user: UserInfo;
};

export default function WorkoutPlanner({
  baseExercises,
  user,
}: WorkoutPlannerProps) {
  const [selectedExercise, setSelectedExercise] = useState<BaseExercise | null>(
    null
  );
  const [workout, setWorkout] = useState<BaseExercise[] | []>([]);
  const [exerciseError, setExerciseError] = useState<string | null>(null);

  const handleAddExercise = (exercise: BaseExercise) => {
    if (workout.some((e) => e.id === exercise.id)) {
      return setExerciseError("Exercise already added");
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
          setError={setExerciseError}
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
          error={exerciseError}
        />
        <div className={styles.dashboard__form}>
          <CreateWorkoutForm
            setWorkout={setWorkout}
            workout={workout}
            user={user}
          />
        </div>
      </div>
    </div>
  );
}
