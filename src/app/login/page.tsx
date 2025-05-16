import LoginForm from '@/components/forms/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login Page',
}

export default function Page() {
  return <LoginForm />
}
