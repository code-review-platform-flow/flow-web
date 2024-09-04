import { Comment } from '@/shared/type/post';
import ky from 'ky';

// 특정 게시물에 댓글 등록
export const postComment = async (postId: number, email: string, commentContent: string): Promise<Comment> => {
    try {
        const response = await ky
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${postId}`, { json: { email, commentContent } })
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
