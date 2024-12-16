import { Post } from '@/shared/type/post';
import apiClient from '../../../shared/api/apiClient';

// postPost 함수가 리턴할 타입 정의
interface PostResponse {
    postId?: number;
}

export const postPost = async (postId: number | undefined, post: Post): Promise<PostResponse> => {
    try {
        const endpoint = postId ? `post/${postId}` : `post`;
        const response = await apiClient
            .post(endpoint, {
                json: post,
            })
            .json<PostResponse>();

        if (!response || !response.postId) {
            throw new Error('게시글 작성 중 오류가 발생했습니다.');
        }

        return response;
    } catch (error) {
        console.error('postPost Error:', error);
        throw new Error(`게시글 작성에 실패했습니다: ${(error as Error).message}`);
    }
};
