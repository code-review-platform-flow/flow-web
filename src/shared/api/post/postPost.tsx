import { PostDetail } from '@/shared/type/post';
import { Post } from '@/shared/type/post';
import ky from 'ky';

// 특정 게시물 등록
export const postPost = async (post: Post): Promise<PostDetail> => {
    try {
        const response = await ky
            .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/post`, { json: { post } })
            .json<PostDetail>();

        if (!response) {
            throw new Error('게시글 작성 중 오류가 발생했습니다.');
        }

        console.log(response);
        return response;
    } catch (error) {
        console.error('postPost Error:', error);
        throw error;
    }
};
