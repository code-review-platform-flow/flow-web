import { Post, PostDetail } from '@/shared/type/post';
import apiClient from '../../../shared/api/apiClient';

// postPost 함수가 리턴할 타입 정의
interface PostResponse {
    postId: number;
}

export const postPost = async (post: Post): Promise<PostResponse> => {
    try {
        const response = await apiClient.post(`post`, { json : post }).json();

        if (!response) {
            throw new Error('게시글 작성 중 오류가 발생했습니다.');
        }

        console.log(response);
        return response as PostResponse;
    } catch (error) {
        console.error('postPost Error:', error);
        throw error;
    }
};
