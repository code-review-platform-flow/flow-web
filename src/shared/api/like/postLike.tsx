import ky from 'ky';

// 특정 게시물의 좋아요 정보를 보내는 함수
export const postLike = async (postId: number, email: string): Promise<{}> => {
    try {
        const response = await ky
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/like/${postId}`, { json: { email } })
            .json();

        if (!response) {
            throw new Error('좋아요 요청을 보내는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`postLike Error for postId ${postId}:`, error);
        throw error;
    }
};
