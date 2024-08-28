import ky from 'ky-universal';

const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
};

const apiClient = ky.extend({
    prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 10000,
    hooks: {
        beforeRequest: [
            (request) => {
                console.log(`Requesting: ${request.url}`);
                const token = getCookie('accessToken');
                console.log(`accessToken : ${token}`);
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                } else {
                    console.error('No authentication token found.');
                }
            },
        ],
        afterResponse: [
            (_request, _options, response) => {
                if (!response.ok) {
                    console.error('API Error:', response);
                }
            },
        ],
    },
    mode: 'cors',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
