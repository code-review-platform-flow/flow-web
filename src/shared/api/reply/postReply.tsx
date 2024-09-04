import ky from 'ky';

// 특정 게시물에 댓글 등록
export const postReply = async (postId: number, commentId:number, email: string, replyContent: string): Promise<Comment> => {
    try {
        const response = await ky
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${postId}/${commentId}`, { json: { email, replyContent } })
            .json<Comment>();

        if (!response) {
            throw new Error('답글을 작성 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`postReply Error for postId ${postId}:`, error);
        throw error;
    }
};
