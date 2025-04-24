import { User } from '@prisma/client'
import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'

const key = new TextEncoder().encode(process.env.SECRET_KEY)

type UserInfo = {
  id: number
  email: string
  username: string
}

type Payload = {
  user: UserInfo
  expires: Date
}

export async function createSession(user: User) {
  const { id, email, username } = user
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const payload: Payload = {
    user: {
      id,
      email,
      username,
    },
    expires,
  }

  const session = await encrypt(payload)

  ;(await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires,
  })
}

export async function encrypt(payload: Payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key)
}

export async function decrypt(input: string): Promise<Payload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  })
  return {
    user: payload.user as UserInfo,
    expires: new Date(payload.expires as string),
  }
}
