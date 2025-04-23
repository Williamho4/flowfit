'use server'

import { comparePassword, hashPassword } from './auth'
import prisma from './db'

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
    throw new Error('User not found')
  }

  const isValid = await comparePassword(password, user.password)

  if (!isValid) {
    throw new Error('Invalid password')
  }

  return user
}
