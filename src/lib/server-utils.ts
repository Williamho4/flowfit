'use server'

import { redirect } from 'next/navigation'
import { comparePassword, hashPassword } from './auth-utils'
import prisma from './db'
import { createSession } from './session'
import { ServerResponse, Workout } from './types'
import { BaseExercise } from '@prisma/client'

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
