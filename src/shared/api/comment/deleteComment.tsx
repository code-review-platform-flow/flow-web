import ky from 'ky';

//특정 댓글 삭제
export const deleteComment = async (postId: number, commentId: number, email: string): Promise<{}> => {
    try {
        const response = await ky
            .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${postId}/${commentId}`, {
                json: { email },
            })
            .json();

        if (!response) {
            throw new Error('댓글을 삭제하는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`deleteComment Error for postId : ${postId} commentId : ${commentId}`, error);
        throw error;
    }
};
