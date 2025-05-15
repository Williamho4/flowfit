'use client'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type ProgressBarProps = {
  value: number
  maxValue: number
}

export default function ProgressBar({ value, maxValue }: ProgressBarProps) {
  return (
    <CircularProgressbar
      value={value}
      maxValue={maxValue}
      text={`${(value / maxValue) * 100}%`}
      styles={buildStyles({
        pathColor: '#1565c0',
        textColor: '#1565c0',
        backgroundColor: '#f1f1f1',
      })}
    />
  )
}
