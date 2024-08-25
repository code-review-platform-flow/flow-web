import ky from 'ky';

const apiClient = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 10000,
    hooks: {
        beforeRequest: [
            (request) => {
                const token = localStorage.getItem('token'); // FIXME 나중에 수정 해야 함
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            },
        ],
        afterResponse: [
            (_request, _options, response) => {
                if (!response.ok) {
                    console.error('API Error:', response.statusText);
                }
            },
        ],
    },
});

export default apiClient;
