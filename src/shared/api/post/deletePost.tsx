import ky from 'ky';

// 특정 게시물 수정
export const deletePost = async (postId: number, email: string): Promise<{}> => {
    try {
        const response = await ky
            .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`, {
                json: { email },
            })
            .json();

        if (!response) {
            throw new Error('게시글 수정 중 오류가 발생했습니다.');
        }

        console.log(response);
        return response;
    } catch (error) {
        console.error('deletePost Error:', error);
        throw error;
    }
};
