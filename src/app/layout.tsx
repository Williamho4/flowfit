import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from './StoreProvider'
import Container from '@/components/container'

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
        <StoreProvider>
          <Container>{children}</Container>
        </StoreProvider>
      </body>
    </html>
  )
}
