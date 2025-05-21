'use client'

import { loginUser } from '@/lib/server-utils'
import { useForm } from 'react-hook-form'
import styles from '@/styles/login-form.module.css'
import Link from 'next/link'

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
    <>
      <form
        className={styles.container}
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
        <p>Demo Login:</p>
        <p>Email: demo Password: demo</p>
        <h1>Login</h1>
        <input
          {...register('email', { required: 'This field is required' })}
          placeholder="email"
          className={styles['input']}
          spellCheck="false"
        />
        <p>{errors.email?.message}</p>
        <input
          {...register('password', { required: 'This field is required' })}
          placeholder="password"
          type="password"
          className={styles['input']}
          spellCheck="false"
        />
        <p>{errors.password?.message}</p>
        <div className={styles['button-container']}>
          <Link href="/signup">Sign Up</Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles['login-button']}
          >
            {isSubmitting ? 'Logging In' : 'Log In'}
          </button>
        </div>
        {errors.root && <p>{errors.root.message}</p>}
        {isSubmitSuccessful && <p>Logged In Successfully</p>}
      </form>
    </>
  )
}
