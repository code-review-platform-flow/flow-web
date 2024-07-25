import type { Metadata } from 'next'
import './styles/globals.css'
import RecoilRootProvider from './state/RecoilRootProvider'
import StyledComponentsRegistry from './styles/registry'
import { Pretendard } from '../../public/fonts/font'
import Header from '@/widgets/header/Header'
import Footer from '@/widgets/footer/Footer'

export const metadata: Metadata = {
  title: 'FLOW',
  description: 'University CodeReview,Coffechat Community',
  icons: {
		icon: 'icons/appIcon.png',
	},
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
      className={Pretendard.className}>
        <RecoilRootProvider>
          <StyledComponentsRegistry>
            <Header/>
            {children}
            <Footer/>
          </StyledComponentsRegistry>
        </RecoilRootProvider>
      </body>
    </html>
  )
}