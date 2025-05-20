import type { Metadata } from 'next'
import './globals.css'
import StoreProvider from './StoreProvider'
import Container from '@/components/container'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { getSession } from '@/lib/session'
import { Poppins } from 'next/font/google'

export const metadata: Metadata = {
  title: 'FlowFit',
  description: 'Log your workouts',
}

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <html lang="en" className={poppins.className}>
      <body>
        <StoreProvider initialSession={session ? session.user : null}>
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
