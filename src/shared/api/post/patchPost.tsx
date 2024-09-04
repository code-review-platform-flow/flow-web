import { PostDetail } from '@/shared/type/post';
import { Post } from '@/shared/type/post';
import ky from 'ky';

// 특정 게시물 수정
export const patchsPost = async (post: Post, postId:number): Promise<PostDetail> => {
    try {
        const response = await ky
            .patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`, { json: { post } })
            .json<PostDetail>();

        if (!response) {
            throw new Error('게시글 수정 중 오류가 발생했습니다.');
        }

        console.log(response);
        return response;
    } catch (error) {
        console.error('patchPost Error:', error);
        throw error;
    }
};
