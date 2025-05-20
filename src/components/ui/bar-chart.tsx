'use client'

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

type ChartProps = {
  data: {
    name: string
    Workouts: number
  }[]
}
export default function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="80%" height="80%">
      <BarChart width={400} height={400} data={data}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <CartesianGrid />
        <Tooltip />
        <Bar dataKey="Workouts" stroke="#fff" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  )
}
