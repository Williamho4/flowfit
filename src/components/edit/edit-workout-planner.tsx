"use client";

import styles from "@/styles/workout-planner.module.css";
import BaseExerciseList from "@/components/workout/shared/base-exercise-list";
import { BaseExercise } from "@prisma/client";
import { useEffect, useState } from "react";
import { Exercise, UserInfo, Workout } from "@/lib/types";
import SelectedExercisesList from "../workout/shared/selected-exercises-list";
import SelectedExercise from "../workout/add/selected-exercise";
import EditWorkoutForm from "./edit-workout-form";

type EditWorkoutPlannerProps = {
  oldWorkout: Workout;
  baseExercises: BaseExercise[] | undefined;
  user: UserInfo;
};

export default function EditWorkoutPlanner({
  baseExercises,
  user,
  oldWorkout,
}: EditWorkoutPlannerProps) {
  const [selectedExercise, setSelectedExercise] = useState<BaseExercise | null>(
    null
  );
  const [workout, setWorkout] = useState<(BaseExercise | Exercise)[] | []>([]);
  const [exerciseError, setExerciseError] = useState<string | null>(null);

  useEffect(() => {
    setWorkout(oldWorkout.exercises);
  }, [oldWorkout]);

  const handleAddExercise = (exercise: BaseExercise) => {
    if (workout.some((e) => e.id === exercise.id)) {
      return setExerciseError("Exercise already added");
    }

    if (oldWorkout.exercises.some((e) => e.baseExercise.id === exercise.id)) {
      return setExerciseError("Exercise already added");
    }

    setWorkout((prev) => [...prev, exercise]);
  };

  const handleDeleteExercise = (id: number) => {
    setWorkout((prev) => prev.filter((exercise) => exercise.id !== id));

    const removeIndex = oldWorkout.exercises.findIndex((e) => e.id === id);
    if (removeIndex !== -1) {
      oldWorkout.exercises.splice(removeIndex, 1);
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles["item-1"]}>
        <BaseExerciseList
          baseExercises={baseExercises}
          setSelected={setSelectedExercise}
          setError={setExerciseError}
        />
      </div>
      <div className={styles["item-2"]}>
        <SelectedExercisesList
          workout={workout}
          handleDelete={(id) => handleDeleteExercise(id)}
        />
      </div>
      <div className={styles["item-3"]}>
        <SelectedExercise
          selectedExercise={selectedExercise}
          handleAddExercise={handleAddExercise}
          setSelected={setSelectedExercise}
          error={exerciseError}
        />
      </div>
      <div className={styles["item-4"]}>
        <EditWorkoutForm
          setWorkout={setWorkout}
          workout={workout}
          user={user}
          workoutId={oldWorkout.id}
          workoutTitle={oldWorkout.title}
          workoutDate={oldWorkout.date}
        />
      </div>
    </div>
  );
}
