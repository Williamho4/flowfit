'use client'

import styles from '@/styles/user.card.module.css'
import Link from 'next/link'
import { FaUser } from 'react-icons/fa'

type UserCardProps = {
  user: { id: number; username: string }
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link href={`/profile/${user.id}`} className={styles.container}>
      <FaUser />
      <p>{user.username}</p>
    </Link>
  )
}
