import SignupForm from '@/components/forms/signup-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up Page',
}

export default function Page() {
  return <SignupForm />
}
