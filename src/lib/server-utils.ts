'use server'

import { redirect } from 'next/navigation'
import { comparePassword, hashPassword } from './auth-utils'
import prisma from './db'
import { createSession } from './session'
import { ServerResponse } from './types'
import { BaseExercise } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function createUser(
  username: string,
  email: string,
  password: string
) {
  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  })

  return user
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user) {
    return { ok: false, message: 'Invalid credentials' }
  }

  const isValid = await comparePassword(password, user.password)
  if (!isValid) {
    return { ok: false, message: 'Invalid credentials' }
  }

  await createSession(user)

  redirect('/')
}

export async function getWorkout(user: number, workoutId: number) {
  if (!workoutId) {
    return redirect('/')
  }

  const workout = await prisma.workout.findUnique({
    where: { id: workoutId, userId: user },
    include: {
      exercises: {
        include: {
          sets: true,
          baseExercise: true,
        },
      },
    },
  })

  if (!workout) {
    return { ok: false, message: 'No workout found' }
  }

  return { ok: true, data: workout }
}

export async function getBaseExercises(): Promise<
  ServerResponse<BaseExercise[]>
> {
  const exercises = await prisma.baseExercise.findMany()

  if (exercises.length === 0) {
    return { ok: false, message: 'Could not get exercises' }
  }

  return { ok: true, data: exercises }
}

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
  })
}

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
    })
    revalidatePath(`/workout/${workoutId}`)
  } catch (error) {
    console.error('Error creating set:', error)
    throw new Error('Failed to create workout set')
  }
}
