"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";
import { redirect } from "next/navigation";
import { BaseExercise } from "@prisma/client";
import { Exercise, ServerResponse } from "./types";

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

  revalidatePath("/dashboard");
}

export async function deleteWorkout(userId: number, workoutId: number) {
  await prisma.workout.delete({
    where: {
      userId,
      id: workoutId,
    },
  });

  revalidatePath("/dashboard");
}

export async function editWorkout(
  userId: number,
  workoutId: number,
  title: string,
  date: Date,
  oldExercises: Exercise[],
  newExercises: BaseExercise[]
) {
  await prisma.workout.update({
    where: {
      userId,
      id: workoutId,
    },
    data: {
      title,
      date,
      exercises: {
        connect: oldExercises.map((ex) => ({ id: ex.id })),
        create: newExercises.map((ex) => ({
          baseExercise: {
            connect: { id: ex.id },
          },
        })),
        deleteMany: {
          workoutId,
          NOT: oldExercises.map((ex) => ({ id: ex.id })),
        },
      },
    },
  });

  revalidatePath("/dashboard");
}

export async function getWorkout(userId: number, workoutId: number) {
  if (!workoutId) {
    return redirect("/dashboard");
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

export async function getThisWeeksWorkouts(userId: number) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
  const diffToMonday = (dayOfWeek + 6) % 7;

  // Start of week (Monday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - diffToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  // End of week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const workouts = await prisma.workout.findMany({
    where: {
      userId,
      date: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      exercises: {
        include: {
          baseExercise: true,
        },
      },
    },
  });

  return workouts;
}

export async function getTodaysWorkouts(userId: number) {
  const targetDate = new Date();

  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);

  const workout = await prisma.workout.findMany({
    where: {
      userId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
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
