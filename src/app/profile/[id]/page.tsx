import AddFriendButton from '@/components/ui/friend-buttons/add-friend-button'
import { getSession } from '@/lib/session'
import { getFriendStatus } from '@/lib/user-server-utils'
import { redirect } from 'next/navigation'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const session = await getSession()
  const { id } = await params

  if (!session) {
    redirect('/')
  }

  if (Number(id) === session.user.id) {
    redirect('/user/profile')
  }

  const friendStatus = await getFriendStatus(session.user.id, Number(id))

  return (
    <section>
      <div>{`user ${id}`}</div>

      {!friendStatus ? (
        <AddFriendButton requestId={session.user.id} receiverId={Number(id)} />
      ) : (
        <button>{friendStatus.status}</button>
      )}
    </section>
  )
}
