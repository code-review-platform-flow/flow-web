import ky from 'ky';

interface RegisterResponse {
    ok: boolean;
    [key: string]: any;
}

export const submitRegister = async (
    studentNumber: string,
    schoolName: string,
    email: string,
    password: string,
    userName: string,
    majorName: string,
): Promise<RegisterResponse> => {
    try {
        const response: RegisterResponse = await ky.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, {
            json: { studentNumber, schoolName, email, password, userName, majorName },
        });

        if (response.ok) {
            console.log('응답 데이터 : ', response);
        } else {
            console.error('보내기 실패');
        }
        return response;
    } catch (error) {
        console.error('에러 :', error);
        throw error;
    }
};
