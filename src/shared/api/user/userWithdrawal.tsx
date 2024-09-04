import ky from 'ky';

// 특정 유저의 학력 수정
export const userWithdrawal = async (feedback: string): Promise<{}> => {
    try {
        const response = await ky
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/withdrawal`, {
                json: { feedback },
            })
            .json();

        if (!response) {
            throw new Error(' 탈퇴하는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`userWithdrawal Error :`, error);
        throw error;
    }
};
