import ky from 'ky-universal';
import { getCookie, setCookie } from 'cookies-next';

const apiClient = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 10000,
    hooks: {
        beforeRequest: [
            (request) => {
                const token = getCookie('accessToken') as string;
                console.log(`token : ${token}`);
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            },
        ],
        afterResponse: [
            async (request, options, response) => {
                if (response.status === 401) {
                    try {
                        const refreshToken = getCookie('refreshToken') as string;
                        if (!refreshToken) {
                            console.error('No refresh token found. Redirecting to login...');
                            window.location.href = '/login';
                            return;
                        }

                        const { newAccessToken } = await ky
                            .patch('/auth/refresh-token', {
                                prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
                                headers: { Authorization: `Bearer ${refreshToken}` },
                            })
                            .json<{ newAccessToken: string }>();

                        setCookie('accessToken', newAccessToken);

                        // 원래 요청 재시도
                        request.headers.set('Authorization', `Bearer ${newAccessToken}`);
                        return ky(request); // 재시도
                    } catch (error) {
                        console.error('Token refresh failed. Redirecting to login...');
                        window.location.href = '/login';
                    }
                }
            },
        ],
    },
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
