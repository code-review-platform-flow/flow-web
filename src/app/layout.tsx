import '@/shared/styles/globals.css';
import { Pretendard } from '../../public/fonts/font';
import type { Metadata } from 'next';
import Header from '@/widgets/header/Header';
import Footer from '@/widgets/footer/Footer';
import ClientWrapper from '@/shared/providers/ClientWrapper';

export const metadata: Metadata = {
    title: 'FLOW',
    description: 'University CodeReview, Coffeechat Community',
    icons: {
        icon: 'icons/appIcon.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body className={Pretendard.className}>
                <ClientWrapper>
                    <Header />
                    {children}
                    <Footer />
                </ClientWrapper>
            </body>
        </html>
    );
}
