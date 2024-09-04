import ky from 'ky';

// 특정 게시물의 좋아요 정보를 가져오는 함수
export const getLike = async (postId: number): Promise<number> => {
    try {
        const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/like/${postId}`).json();

        if (!response) {
            throw new Error('좋아요 정보를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data as number;
    } catch (error) {
        console.error(`getLike Error for postId ${postId}:`, error);
        throw error;
    }
};
