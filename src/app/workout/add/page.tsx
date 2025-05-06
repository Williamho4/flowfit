import WorkoutPlanner from '@/components/workout-planner'
import { getBaseExercises } from '@/lib/server-utils'

export default async function Page() {
  const res = await getBaseExercises()

  return <WorkoutPlanner baseExercises={res.data} />
}
