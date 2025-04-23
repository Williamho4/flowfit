'use client'

import { createUser } from '@/lib/server-utils'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type Inputs = {
  username: string
  email: string
  password: string
}

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>()

  const router = useRouter()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const { username, email, password } = data
        const user = await createUser(username, email, password)
        if (user) {
          router.push('/')
        }
      })}
    >
      <input
        {...register('username', { required: 'This field is required' })}
        placeholder="username"
      />
      <p>{errors.username?.message}</p>
      <input
        {...register('email', { required: 'This field is required' })}
        placeholder="email"
      />
      <p>{errors.email?.message}</p>
      <input
        {...register('password', {
          required: true,
          minLength: {
            value: 4,
            message: 'Minimum length is 4',
          },
        })}
        placeholder="password"
      />
      <p>{errors.password?.message}</p>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering' : 'Sign Up'}
      </button>
      {isSubmitSuccessful && <p>Signed up successfully</p>}
    </form>
  )
}
