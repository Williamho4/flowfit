"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { redirect } from "next/navigation";
import { BaseExercise } from "@prisma/client";
import { ServerResponse } from "./types";

//Base Exercises

export async function getBaseExercises(): Promise<
  ServerResponse<BaseExercise[]>
> {
  const exercises = await prisma.baseExercise.findMany();

  if (exercises.length === 0) {
    return { ok: false, message: "Could not get exercises" };
  }

  return { ok: true, data: exercises };
}

//Workouts

export async function createWorkout(
  title: string,
  date: Date,
  userId: number,
  exercises: BaseExercise[]
) {
  await prisma.workout.create({
    data: {
      title,
      date: new Date(date),
      userId,
      exercises: {
        create: exercises.map((ex) => ({
          baseExercise: {
            connect: { id: ex.id },
          },
          // add any additional fields specific to WorkoutExercise, if needed
        })),
      },
    },
  });

  revalidatePath("/");
}

export async function getWorkout(userId: number, workoutId: number) {
  if (!workoutId) {
    return redirect("/");
  }

  const workout = await prisma.workout.findUnique({
    where: { id: workoutId, userId },
    include: {
      exercises: {
        include: {
          sets: true,
          baseExercise: true,
        },
      },
    },
  });

  if (!workout) {
    return { ok: false, message: "No workout found" };
  }

  return { ok: true, data: workout };
}

export async function getAllWorkoutTitles(userId: number) {
  const workouts = await prisma.workout.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "asc",
    },
    select: {
      title: true,
      date: true,
      id: true,
    },
  });

  return workouts;
}

export async function getTodaysWorkouts(userId: number) {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();

  const date = new Date(Date.UTC(year, month, day, 0, 0, 0));

  const workout = await prisma.workout.findMany({
    where: {
      userId,
      date,
    },
    include: {
      exercises: {
        include: {
          sets: true,
          baseExercise: true,
        },
      },
    },
  });

  if (workout.length <= 0) {
    return { ok: false, message: "No workout found" };
  }

  return { ok: true, data: workout };
}

//SETS

export async function createSet(
  workoutExerciseId: number,
  reps: number,
  weight: number,
  workoutId: number
) {
  try {
    await prisma.workoutExerciseSet.create({
      data: {
        reps,
        weight,
        workoutExerciseId,
      },
    });
    revalidatePath(`/workout/${workoutId}`);
  } catch (error) {
    console.error("Error creating set:", error);
    throw new Error("Failed to create workout set");
  }
}

export async function deleteSet(setId: number, workoutId: number) {
  try {
    await prisma.workoutExerciseSet.delete({
      where: {
        id: setId,
      },
    });
    revalidatePath(`/workout/${workoutId}`);
  } catch (error) {
    console.error("Error deleting set:", error);
    throw new Error("Failed to delete set");
  }
}

export async function editSet(
  setId: number,
  reps: number,
  weight: number,
  workoutId: number
) {
  try {
    await prisma.workoutExerciseSet.update({
      where: {
        id: setId,
      },
      data: {
        reps,
        weight,
      },
    });
    revalidatePath(`/workout/${workoutId}`);
  } catch (error) {
    console.error("Error updating set:", error);
    throw new Error("Failed to update set");
  }
}
