import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import RecoilRootProvider from './state/RecoilRootProvider'
import StyledComponentsRegistry from './styles/registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FLOW',
  description: 'University CodeReview,Coffechat Community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecoilRootProvider>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </RecoilRootProvider>
      </body>
    </html>
  )
}