'use client'

import { User } from '@/lib/types'
import { searchUsers } from '@/lib/user-server-utils'
import { useEffect, useState } from 'react'
import UserCard from './user-card'
import styles from '@/styles/user-list.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'

export default function UserList() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<User[] | []>([])

  const user = useSelector((state: RootState) => state.session.session)

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (search.trim().length === 0) {
        setResults([])
        return
      }

      if (!user) {
        return
      }

      const users = await searchUsers(search, user.id)
      setResults(users)
    }, 300)

    return () => clearTimeout(timeout)
  }, [search, user])

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {results.length > 0 && (
        <ul className={styles['list-container']}>
          {results.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      )}
    </div>
  )
}
