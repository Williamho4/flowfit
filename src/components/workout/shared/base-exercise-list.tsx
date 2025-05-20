"use client";

import styles from "@/styles/base-exercises-list.module.css";
import BaseExerciseCard from "./base-exercise-card";
import { BaseExercise } from "@prisma/client";
import { useState } from "react";
import Filter from "../../ui/filter";
import { muscleFilter } from "@/lib/constants";

type BaseExerciseListProps = {
  baseExercises: BaseExercise[] | undefined;
  setSelected: React.Dispatch<React.SetStateAction<BaseExercise | null>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function BaseExerciseList({
  baseExercises,
  setSelected,
  setError,
}: BaseExerciseListProps) {
  const [filteredExercises, setFilteredExercises] = useState(baseExercises);

  const handleFilterChange = (e: string) => {
    if (e === "All") {
      return setFilteredExercises(baseExercises);
    }

    setFilteredExercises(
      baseExercises?.filter((exercise) => exercise.category === e)
    );
  };

  return (
    <>
      {baseExercises ? (
        <div className={styles.container}>
          <Filter
            options={muscleFilter}
            handleChange={handleFilterChange}
            classes={styles.filter}
          />
          <ul className={styles.list}>
            {filteredExercises?.map((exercise) => (
              <BaseExerciseCard
                setError={setError}
                onSelect={setSelected}
                exercise={exercise}
                key={exercise.id}
                classes={styles.card}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div>Could not load base exercises</div>
      )}
    </>
  );
}
