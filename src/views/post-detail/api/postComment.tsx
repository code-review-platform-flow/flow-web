import { Comment } from '@/shared/type/post';
import apiClient from '../../../shared/api/apiClient';

// 특정 게시물에 댓글 등록
export const postComment = async (postId: string, email: string, commentContent: string): Promise<Comment> => {
    try {
        const response = await apiClient
            .post(`comment/${postId}`, { json: { email, commentContent } })
            .json<Comment>();

        if (!response) {
            throw new Error('댓글을 작성 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`postComment Error for postId ${postId}:`, error);
        throw error;
    }
};
