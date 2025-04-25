import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from './StoreProvider'

export const metadata: Metadata = {
  title: 'FlowFit',
  description: 'Log your workouts',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
