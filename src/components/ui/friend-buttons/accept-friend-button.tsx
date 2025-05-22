'use client'

import { acceptFriendRequest } from '@/lib/user-server-utils'

type AcceptFriendButtonProps = {
  receiverId: number
  requestId: number
  pathToRevalidate: string
}

export default function AcceptFriendButton({
  receiverId,
  requestId,
  pathToRevalidate,
}: AcceptFriendButtonProps) {
  const handleClick = (receiverId: number, requestId: number) => {
    acceptFriendRequest(requestId, receiverId, pathToRevalidate)
  }

  return (
    <button onClick={() => handleClick(receiverId, requestId)}>Accept</button>
  )
}
