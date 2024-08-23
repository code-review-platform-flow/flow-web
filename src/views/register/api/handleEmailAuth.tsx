import ky from "ky";

interface EmailAuthResponse {
    ok: boolean;
    [key: string]: any;  // 추가적인 키-값 쌍을 허용하는 타입
}

export const handleEmailAuth = async (email: string, universityName: string): Promise<EmailAuthResponse> => {
    try {
        const response: EmailAuthResponse = await ky.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/email`, {
            json: { email, universityName },
        }).json();

        if (response.ok) {
            console.log('Response data:', response);
        } else {
            console.error('Failed to send data');
        }
        return response;  // 응답 객체를 반환합니다.
    } catch (error) {
        console.error('Error:', error);
        throw error;  // 에러를 호출자에게 전달합니다.
    }
};
