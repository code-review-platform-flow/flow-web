import ky from 'ky-universal';

const apiClient = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 10000,
    hooks: {
        beforeRequest: [
            (request) => {
                const authData = JSON.parse(localStorage.getItem('authData') || '{}');
                const token = authData?.accessToken;
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
                        const authData = JSON.parse(localStorage.getItem('authData') || '{}');
                        const refreshToken = authData?.refreshToken;
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

                        const updatedAuthData = { ...authData, accessToken: newAccessToken };
                        localStorage.setItem('authData', JSON.stringify(updatedAuthData));

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
