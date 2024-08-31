import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(req: NextRequest) {
    // 쿠키에서 accessToken 가져오기
    const accessToken = getCookie('accessToken', { req });

    // accessToken이 존재하고, /login 또는 /register 경로에 접근할 때 리디렉션
    const isAuthPage = ['/login', '/register'].includes(req.nextUrl.pathname);
    if (accessToken && isAuthPage) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // 다음 미들웨어 또는 페이지로 요청을 전달
    return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
    matcher: ['/login', '/register'],
};
