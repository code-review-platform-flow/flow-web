import ky from 'ky-universal';
import { getCookie } from 'cookies-next'; // cookies-next에서 getCookie import

const apiClient = ky.extend({
    prefixUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    timeout: 10000,
    hooks: {
        beforeRequest: [
            (request) => {
                console.log(`Requesting: ${request.url}`);
                const token = getCookie('accessToken') as string;
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
