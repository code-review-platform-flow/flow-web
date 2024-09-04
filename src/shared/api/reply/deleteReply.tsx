import ky from 'ky';

//특정 답글 삭제
export const deleteReply = async (postId: number, commentId: number, replyId:number, email: string): Promise<{}> => {
    try {
        const response = await ky
            .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${postId}/${commentId}/reply/${replyId}`, {
                json: { email },
            })
            .json();

        if (!response) {
            throw new Error('답글을 삭제하는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`deleteReply Error for postId : ${postId} commentId : ${commentId}, replyId: ${replyId}`, error);
        throw error;
    }
};
