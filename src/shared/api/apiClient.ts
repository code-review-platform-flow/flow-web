import ky from 'ky';

const apiClient = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 10000,
    hooks: {
        beforeRequest: [
            (request) => {
                console.log(`Requesting: ${request.url}`);
                const token = localStorage.getItem('token');
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
