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
  sets: number
  reps: number
  exercise: BaseExercise
}

export type BaseExercise = {
  id: number
  name: string
  description: string | null
  category: string | null
}

export type ServerResponse<T> = {
  ok: boolean
  data?: T
  message?: string
}
