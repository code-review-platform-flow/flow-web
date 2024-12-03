import { PostDetail } from '@/shared/type/post';
import apiClient from '../apiClient';

// 특정 게시물의 상세 정보를 가져오는 함수
export const getPostDetail = async (postId: number): Promise<PostDetail> => {
    try {
        console.log(1);
        const response = await apiClient.get(`post/${postId}`);

        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log('게시글 정보' + data);
        return data as PostDetail;
    } catch (error) {
        console.error(`getPostDetail Error for postId ${postId}:`, error);
        throw error;
    }
};
