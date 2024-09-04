import ky from 'ky';

//특정 댓글 수정
export const patchUserOneLines = async (email: string, oneLiner: string): Promise<{}> => {
    try {
        const response = await ky
            .patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/one-liner`, {
                json: {
                    email,
                    oneLiner,
                },
            })
            .json();

        if (!response) {
            throw new Error('유저 한글 소개를 수정하는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`patchUserOneLines Error`, error);
        throw error;
    }
};
