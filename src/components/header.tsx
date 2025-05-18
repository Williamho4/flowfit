'use client'

import styles from '@/styles/header.module.css'
import Link from 'next/link'
import { deleteSession } from '@/lib/session'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">FlowFit</Link>
      <Link href="/workout/add">Workout Planner</Link>
      <button
        onClick={() => {
          deleteSession()
          localStorage.removeItem('chosenExercises')
        }}
      >
        Logout
      </button>
    </header>
  )
}
