import apiClient from '@/shared/api/apiClient';
import { Comment } from '@/shared/type/post';

//특정 댓글 수정
export const patchComment = async (
    postId: string,
    commentId: number,
    email: string,
    commentContent: string,
): Promise<Comment> => {
    try {
        const response = await apiClient.patch(`comment/${postId}/${commentId}`, {
            json: { email, commentContent },
        });

        if (!response.ok) {
            throw new Error('댓글을 수정하는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log(data);
        return data as Comment;
    } catch (error) {
        console.error(`patchComment Error for postId : ${postId} commentId : ${commentId}`, error);
        throw error;
    }
};
