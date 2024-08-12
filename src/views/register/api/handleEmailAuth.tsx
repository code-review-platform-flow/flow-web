import ky from "ky";

interface EmailAuthResponse {
    ok: boolean;
    [key: string]: any;  // 추가적인 키-값 쌍을 허용하는 타입
}

export const handleEmailAuth = async (email: string, universityName: string): Promise<void> => {
    try {
        const response: EmailAuthResponse = await ky.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/email`, {
            json: { email, universityName },
        }).json();

        if (response.ok) {
            console.log('Response data:', response);
        } else {
            console.error('Failed to send data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
