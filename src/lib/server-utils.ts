'use server'

import { redirect } from 'next/navigation'
import { comparePassword, hashPassword } from './auth-utils'
import prisma from './db'
import { createSession, deleteSession } from './session'

export async function createUser(
  username: string,
  email: string,
  password: string
) {
  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      username: username.toLowerCase(),
      email,
      password: hashedPassword,
    },
  })

  return user
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
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

export async function logout() {
  await deleteSession()
  redirect('/login')
}
