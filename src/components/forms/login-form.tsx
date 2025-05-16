'use client'

import { loginUser } from '@/lib/server-utils'
import { useForm } from 'react-hook-form'

type Inputs = {
  email: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Inputs>()

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        const res = await loginUser(email, password)

        if (!res.ok) {
          setError('root', {
            type: 'server',
            message: res.message || 'Something went wrong',
          })
        } else {
          alert('Logged in!')
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
      {errors.root && <p>{errors.root.message}</p>}
      {isSubmitSuccessful && <p>Logged In Successfully</p>}
    </form>
  )
}
