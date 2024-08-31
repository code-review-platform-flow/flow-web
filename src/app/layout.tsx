import '@/shared/styles/globals.css';
import { Pretendard } from '../../public/fonts/font';
import type { Metadata } from 'next';
import Footer from '@/widgets/footer/Footer';
import ClientWrapper from '@/shared/providers/ClientWrapper';
import ClientLayout from './ClientLayout'; // 클라이언트 전용 레이아웃 컴포넌트 임포트

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
                    <ClientLayout>{children}</ClientLayout>
                    <Footer />
                </ClientWrapper>
            </body>
        </html>
    );
}
