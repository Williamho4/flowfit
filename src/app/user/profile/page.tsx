import FriendList from '@/components/ui/friend-list'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import styles from '@/styles/user-profile-page.module.css'
import FriendRequestList from '@/components/ui/friend-request-list'

export default async function Page() {
  const session = await getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <section className={styles.container}>
      <div className={styles['friend-list-container']}>
        <FriendList userId={session.user.id} />
      </div>
      <div className={styles['friend-list-container']}>
        <FriendRequestList />
      </div>
    </section>
  )
}
