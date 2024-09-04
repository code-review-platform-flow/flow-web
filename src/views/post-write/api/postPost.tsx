import { Post, PostDetail } from '@/shared/type/post';
import apiClient from '../../../shared/api/apiClient';

// 특정 게시물 등록
export const postPost = async (post: Post): Promise<Post> => {
    try {
        const response = await apiClient.post(`post`, { json : post }).json();

        if (!response) {
            throw new Error('게시글 작성 중 오류가 발생했습니다.');
        }

        console.log(response);
        return response as Post;
    } catch (error) {
        console.error('postPost Error:', error);
        throw error;
    }
};
