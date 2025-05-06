import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from './StoreProvider'
import Container from '@/components/container'
import Header from '@/components/header'
import Footer from '@/components/footer'

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
          <Container>
            <Header />
            {children}
            <Footer />
          </Container>
        </StoreProvider>
      </body>
    </html>
  )
}
