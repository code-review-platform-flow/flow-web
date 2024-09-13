import apiClient from '@/shared/api/apiClient';
import { Comment } from '@/shared/type/post';
import ky from 'ky';

//특정 댓글 수정
export const patchReply = async (
    postId: string,
    commentId: number,
    replyId: number,
    email: string,
    replyContent: string,
): Promise<Comment> => {
    try {
        const response = await apiClient.patch(`comment/${postId}/${commentId}/reply/${replyId}`, {
            json: { email, replyContent },
        });

        if (!response.ok) {
            throw new Error('답글을 수정하는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log(data);
        return data as Comment;
    } catch (error) {
        console.error(`patchReply Error for postId : ${postId} ,commentId : ${commentId} ,replyId: ${replyId}`, error);
        throw error;
    }
};
