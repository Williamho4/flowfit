import styles from '@/styles/flip-card.module.css'
import { ReactNode } from 'react'

type FlipCardProps = {
  children: ReactNode
  back: ReactNode
}

export default function FlipCard({ children, back }: FlipCardProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {children}
        <div className={styles.back}>{back}</div>
      </div>
    </div>
  )
}
