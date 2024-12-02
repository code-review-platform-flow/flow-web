import apiClient from '@/shared/api/apiClient';
import { Like } from '../../model/type';

export const getLike = async (postId: string, email: string): Promise<Like> => {
    try {
        const response = await apiClient
            .get(`like/${postId}`, {
                searchParams: { email },
            })
            .json<Like>();

        if (!response) {
            throw new Error('좋아요 정보를 가져오는 중 오류가 발생했습니다.');
        }
        return response;
    } catch (error) {
        console.error(`getLike Error for postId ${postId}:`, error);
        throw error;
    }
};
