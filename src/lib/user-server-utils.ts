'use server'

import { revalidatePath } from 'next/cache'
import prisma from './db'

export async function searchUsers(search: string, userId: number) {
  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: search,
        mode: 'insensitive',
      },
      NOT: {
        id: userId,
      },
    },
    select: {
      id: true,
      username: true,
    },
    take: 10,
  })

  return users
}

export async function getAllFriends(userId: number) {
  const friendships = await prisma.friendRequest.findMany({
    where: {
      OR: [{ requesterId: userId }, { receiverId: userId }],
      status: 'ACCEPTED',
    },
    include: {
      requester: {
        select: {
          id: true,
          username: true,
        },
      },
      receiver: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  })

  const friends = friendships.map((friend) => {
    if (friend.requesterId === userId) {
      return friend.receiver
    } else {
      return friend.requester
    }
  })

  return friends
}

export async function getFriendStatus(user1Id: number, user2Id: number) {
  const status = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { requesterId: user1Id, receiverId: user2Id },
        { requesterId: user2Id, receiverId: user1Id },
      ],
    },
    include: {
      requester: {
        select: {
          username: true,
        },
      },
    },
  })

  return status
}

export async function sendFriendRequest(
  requesterId: number,
  receiverId: number
) {
  await prisma.friendRequest.create({
    data: {
      requesterId,
      receiverId,
    },
  })

  revalidatePath(`/profile/${receiverId}`)
}

export async function getFriendRequests(receiverId: number) {
  const friendRequest = await prisma.friendRequest.findMany({
    where: {
      receiverId,
      status: 'PENDING',
    },
    include: {
      requester: {
        select: {
          username: true,
        },
      },
    },
  })

  return friendRequest
}

export async function acceptFriendRequest(
  id: number,
  receiverId: number,
  pathToRevalidate: string
) {
  await prisma.friendRequest.update({
    where: {
      id,
      receiverId,
    },
    data: {
      status: 'ACCEPTED',
    },
  })

  revalidatePath(pathToRevalidate)
}

export async function removeFriend(userId: number, friendId: number) {
  await prisma.friendRequest.deleteMany({
    where: {
      OR: [
        { requesterId: userId, receiverId: friendId },
        { requesterId: friendId, receiverId: userId },
      ],
      status: 'ACCEPTED',
    },
  })
}
