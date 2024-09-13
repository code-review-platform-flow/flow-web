import ky from 'ky';

interface EmailAuthResponse {
    ok: boolean;
    [key: string]: any;
}

interface CodeAuthResponse {
    ok: boolean;
    [key: string]: any;
}

export const emailAuth = async (email: string, universityName: string): Promise<EmailAuthResponse> => {
    console.log(email, universityName);
    try {
        const response: EmailAuthResponse = await ky.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/email`, {
            json: { email, universityName },
        });

        console.log('Response data:', response);

        if (response.ok) {
            console.log('Response data:', response);
        } else {
            console.error('Failed to send data');
        }
        return response; // 응답 객체를 반환합니다.
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 호출자에게 전달합니다.
    }
};

export const codeAuth = async (email: string, universityName: string, code: string): Promise<CodeAuthResponse> => {
    try {
        const response: CodeAuthResponse = await ky
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/code`, {
                json: { email, universityName, code },
            })
            .json();

        if (response.ok) {
            console.log('Response data:', response);
        } else {
            console.error('Failed to send data');
        }
        return response; // 응답 객체를 반환합니다.
    } catch (error) {
        console.error('Error:', error);
        throw error; // 에러를 호출자에게 전달합니다.
    }
};
