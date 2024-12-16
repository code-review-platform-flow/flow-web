import apiClient from '../../../../shared/api/apiClient';

//특정 답글 삭제
export const deletePost = async (postId: string, email: string): Promise<{}> => {
    try {
        const response = await apiClient
            .delete(`post/${postId}/`, {
                json: { email },
            })
            .json();

        if (!response) {
            throw new Error('게시글 삭제하는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`deletePost Error for postId : ${postId}`, error);
        throw error;
    }
};
