'use client'

import { loginUser } from '@/lib/server-utils'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>()
  const router = useRouter()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        const user = await loginUser(email, password)
        if (user) {
          router.push('/')
        }
      })}
    >
      <input
        {...register('email', { required: 'This field is required' })}
        placeholder="email"
      />
      <p>{errors.email?.message}</p>
      <input
        {...register('password', { required: 'This field is required' })}
        placeholder="password"
      />
      <p>{errors.password?.message}</p>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging In' : 'Log In'}
      </button>
      {isSubmitSuccessful && <p>Logged In Successfully</p>}
    </form>
  )
}
