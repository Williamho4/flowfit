import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // 1. Create users
  const passwordHash = await bcrypt.hash('password123', 10)

  const users = await prisma.user.createMany({
    data: [
      { username: 'alice', email: 'alice@example.com', password: passwordHash },
      { username: 'bob', email: 'bob@example.com', password: passwordHash },
    ],
    skipDuplicates: true,
  })

  // 2. Create base exercises
  const baseExercisesData = [
    {
      name: 'Bench Press',
      description: 'Chest compound movement',
      category: 'Chest',
    },
    { name: 'Squat', description: 'Leg compound movement', category: 'Legs' },
    {
      name: 'Deadlift',
      description: 'Posterior chain movement',
      category: 'Back',
    },
    {
      name: 'Overhead Press',
      description: 'Shoulder press',
      category: 'Shoulders',
    },
    { name: 'Pull-Up', description: 'Back and biceps', category: 'Back' },
  ]

  await prisma.baseExercise.createMany({
    data: baseExercisesData,
    skipDuplicates: true,
  })

  const baseExercises = await prisma.baseExercise.findMany()
  const [bench, squat, deadlift, ohp, pullup] = baseExercises

  const alice = await prisma.user.findUnique({
    where: { email: 'alice@example.com' },
  })
  const bob = await prisma.user.findUnique({
    where: { email: 'bob@example.com' },
  })

  // 3. Create workouts
  const workout1 = await prisma.workout.create({
    data: {
      title: 'Push Day',
      userId: alice!.id,
      exercises: {
        create: [
          { exerciseId: bench.id, sets: 3, reps: 8 },
          { exerciseId: ohp.id, sets: 3, reps: 10 },
        ],
      },
    },
  })

  const workout2 = await prisma.workout.create({
    data: {
      title: 'Leg Day',
      userId: bob!.id,
      exercises: {
        create: [
          { exerciseId: squat.id, sets: 4, reps: 6 },
          { exerciseId: deadlift.id, sets: 3, reps: 5 },
        ],
      },
    },
  })

  const workout3 = await prisma.workout.create({
    data: {
      title: 'Back Day',
      userId: alice!.id,
      exercises: {
        create: [
          { exerciseId: pullup.id, sets: 4, reps: 10 },
          { exerciseId: deadlift.id, sets: 3, reps: 5 },
        ],
      },
    },
  })

  console.log('✅ Seeded users, base exercises, and workouts')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
