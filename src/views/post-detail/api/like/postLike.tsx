import apiClient from '@/shared/api/apiClient';

// 특정 게시물의 좋아요 정보를 보내는 함수
export const postLike = async (postId: string, email: string): Promise<{}> => {
    try {
        const response = await apiClient.post(`like/${postId}`, { json: { email } }).json();

        if (!response) {
            throw new Error('좋아요 요청을 보내는 중 오류가 발생했습니다.');
        }
        const data = await response;

        return data;
    } catch (error) {
        console.error(`postLike Error for postId ${postId}:`, error);
        throw error;
    }
};
