'use client'

import styles from '@/styles/header.module.css'
import Link from 'next/link'
import { deleteSession } from '@/lib/session'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { removeSession } from '@/lib/features/session/sessionSlice'
import { FaUser } from 'react-icons/fa'
import Logo from './ui/logo'
import { CiLogout } from 'react-icons/ci'

export default function Header() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.session.session)

  return (
    <header className={styles.header}>
      <Logo />
      {user ? (
        <>
          <Link href="/workout/add" className={styles.link}>
            Workout Planner
          </Link>
          <Link href={`/user/profile`} className={styles.user}>
            <FaUser className={styles.user__icon} />
            <p className={styles.user__username}>{user.username}</p>
          </Link>
          <button
            className={styles.logout}
            onClick={() => {
              deleteSession()
              dispatch(removeSession())
              localStorage.removeItem('chosenExercises')
            }}
          >
            <CiLogout />
          </button>
        </>
      ) : (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      )}
    </header>
  )
}
