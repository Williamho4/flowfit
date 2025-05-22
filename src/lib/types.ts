import { BaseExercise, WorkoutExerciseSet } from '@prisma/client'

export type UserInfo = {
  id: number
  email: string
  username: string
}

export type User = {
  id: number
  username: string
}

export type Payload = {
  user: UserInfo
  expires: Date
}

export type Workout = {
  id: number
  title: string
  date: Date
  userId: number
  exercises: Exercise[]
}

export type WorkoutWithoutSets = {
  id: number
  title: string
  date: Date
  userId: number
  exercises: {
    id: number
    workoutId: number
    exerciseId: number
    baseExercise: BaseExercise
  }[]
}

export type Exercise = {
  id: number
  workoutId: number
  exerciseId: number
  sets: Set[]
  baseExercise: BaseExercise
}

export type InputSet = {
  id: number
  reps: number
  weight: number
}

export type Set = WorkoutExerciseSet & {}

export type ComparableSet = Omit<Set, 'workoutExerciseId'>

export type ServerResponse<T> = {
  ok: boolean
  data?: T
  message?: string
}
