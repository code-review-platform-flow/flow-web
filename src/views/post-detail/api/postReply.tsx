import {  Reply } from '@/shared/type/post';
import apiClient from '../../../shared/api/apiClient';

// 특정 게시물에 답글 등록
export const postReply = async (
    postId: string,
    commentId: number,
    email: string,
    replyContent: string,
): Promise<Reply> => {
    try {
        const response = await apiClient
            .post(`comment/${postId}/${commentId}`, { json: { email, replyContent } })
            .json<Reply>();

        if (!response) {
            throw new Error('답글을 작성 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`postReply Error for postId : ${postId},`, error);
        throw error;
    }
};
