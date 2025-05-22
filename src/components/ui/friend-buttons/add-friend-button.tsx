'use client'

import { sendFriendRequest } from '@/lib/user-server-utils'

type AcceptFriendButtonProps = {
  receiverId: number
  requestId: number
}

export default function AddFriendButton({
  requestId,
  receiverId,
}: AcceptFriendButtonProps) {
  const handleClick = (receiverId: number, requestId: number) => {
    sendFriendRequest(requestId, receiverId)
  }

  return (
    <button onClick={() => handleClick(receiverId, requestId)}>
      Add friend
    </button>
  )
}
