import WorkoutList from '@/components/workout-list'

type Props = {
  params: {
    id: string
  }
}

export default async function WorkoutPage({ params }: Props) {
  const { id } = await params

  return <WorkoutList workoutId={id} />
}
