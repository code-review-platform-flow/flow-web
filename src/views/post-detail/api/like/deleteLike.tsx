import apiClient from '@/shared/api/apiClient';

// 특정 게시물의 좋아요 정보를 취소하는 함수
export const deleteLike = async (postId: string, email: string): Promise<{}> => {
    try {
        const response = await apiClient.delete(`like/${postId}`, { json: { email } }).json();

        if (!response) {
            throw new Error('좋아요를 취소하는 중 오류가 발생했습니다.');
        }
        const data = await response;

        return data;
    } catch (error) {
        console.error(`deleteLike Error for postId ${postId}:`, error);
        throw error;
    }
};
