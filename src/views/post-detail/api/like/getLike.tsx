import apiClient from '@/shared/api/apiClient';
import { Like } from '../../model/type';

// 특정 게시물의 좋아요 정보를 가져오는 함수
export const getLike = async (postId: string): Promise<Like> => {
    try {
        const response = await apiClient.get(`like/${postId}`).json();

        if (!response) {
            throw new Error('좋아요 정보를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data as Like;
    } catch (error) {
        console.error(`getLike Error for postId ${postId}:`, error);
        throw error;
    }
};
