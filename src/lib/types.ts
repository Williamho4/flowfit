import { BaseExercise } from '@prisma/client'

export type UserInfo = {
  id: number
  email: string
  username: string
}

export type Payload = {
  user: UserInfo
  expires: Date
}

export type Workout = {
  id: number
  title: string
  createdAt: Date
  userId: number
  exercises: Exercise[]
}

export type Exercise = {
  id: number
  workoutId: number
  exerciseId: number
  sets?: Set[]
  baseExercise: BaseExercise
}

export type Set = {
  id: number
  reps: number
  workoutExerciseId: number
}

export type ServerResponse<T> = {
  ok: boolean
  data?: T
  message?: string
}
