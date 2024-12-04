import { PostDetail } from '@/shared/type/post';
import apiClient from '../apiClient';

export const getPostDetail = async (postId: number, email?: string): Promise<PostDetail> => {
    try {
        const response = await apiClient.get(`post/${postId}`, {
            ...(email && { searchParams: { email } }), // email이 있을 때만 searchParams 추가
        });

        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log('게시글 정보:', data);
        return data as PostDetail;
    } catch (error) {
        console.error(`getPostDetail Error for postId ${postId}:`, error);
        throw error;
    }
};
