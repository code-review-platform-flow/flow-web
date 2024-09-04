import { Comment } from "@/shared/type/post";
import ky from "ky";

// 특정 게시물의 상세 정보를 가져오는 함수
export const getComment = async (postId: number): Promise<Comment> => {
    try {
        const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${postId}`);

        if (!response.ok) {
            throw new Error('댓글을 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log(data)
        return data as Comment;

    } catch (error) {
        console.error(`getComment Error for postId ${postId}:`, error);
        throw error; 
    }
};