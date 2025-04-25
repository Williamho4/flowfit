import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      username: 'john_doe',
      email: 'john.doe@example.com',
      password: 'hashed_password', // Make sure to hash the password!
    },
  })

  // Create workouts
  const workout1 = await prisma.workout.create({
    data: {
      title: 'Full Body Workout',
      userId: user.id,
    },
  })

  const workout2 = await prisma.workout.create({
    data: {
      title: 'Upper Body Workout',
      userId: user.id,
    },
  })

  // Create exercises
  const exercise1 = await prisma.exercise.create({
    data: {
      name: 'Push-up',
      description:
        'A bodyweight exercise targeting the chest, shoulders, and triceps.',
      category: 'Strength',
    },
  })

  const exercise2 = await prisma.exercise.create({
    data: {
      name: 'Squat',
      description:
        'A lower body exercise targeting the quads, hamstrings, and glutes.',
      category: 'Strength',
    },
  })

  // Assign exercises to workouts (via WorkoutExercise)
  await prisma.workoutExercise.create({
    data: {
      workoutId: workout1.id,
      exerciseId: exercise1.id,
      sets: 3,
      reps: 15,
    },
  })

  await prisma.workoutExercise.create({
    data: {
      workoutId: workout2.id,
      exerciseId: exercise2.id,
      sets: 4,
      reps: 12,
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
