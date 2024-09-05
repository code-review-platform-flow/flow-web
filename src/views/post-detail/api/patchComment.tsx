import { Comment } from "@/shared/type/post";
import ky from "ky";

//특정 댓글 수정 
export const patchComment = async (postId: number , commentId:number): Promise<Comment> => {
    try {
        const response = await ky.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${postId}/${commentId}`);

        if (!response.ok) {
            throw new Error('댓글을 수정하는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log(data)
        return data as Comment;

    } catch (error) {
        console.error(`patchComment Error for postId : ${postId} commentId : ${commentId}`, error);
        throw error; 
    }
};