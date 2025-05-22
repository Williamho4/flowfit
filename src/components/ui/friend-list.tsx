import { getAllFriends } from '@/lib/user-server-utils'
import UserCard from './user-card'
import styles from '@/styles/friend-list.module.css'

type FriendListProps = {
  userId: number
}

export default async function FriendList({ userId }: FriendListProps) {
  const friends = await getAllFriends(userId)

  return (
    <div className={styles.container}>
      <h1>Friends</h1>
      <ul className={styles.list}>
        {friends.map((friend) => (
          <UserCard key={friend.id} user={friend} />
        ))}
      </ul>
    </div>
  )
}
