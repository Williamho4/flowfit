import { getSession } from '@/lib/session'
import { getFriendRequests } from '@/lib/user-server-utils'
import AcceptFriendButton from './friend-buttons/accept-friend-button'
import styles from '@/styles/friend-request-list.module.css'
import UserList from './user-list'
import { FaUser } from 'react-icons/fa'

export default async function FriendRequestList() {
  const session = await getSession()

  if (!session) {
    return
  }

  const friendRequests = await getFriendRequests(session.user.id)

  return (
    <div className={styles.container}>
      <h1>Add new friends</h1>
      <UserList />
      <ul className={styles.list}>
        {friendRequests.map((request) => (
          <li key={request.id} className={styles['user-card']}>
            <FaUser />
            <p>{request.requester.username}</p>
            <div className={styles['user-card-button']}>
              <AcceptFriendButton
                receiverId={session.user.id}
                requestId={request.id}
                pathToRevalidate={`/user/profile/${session.user.id}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
