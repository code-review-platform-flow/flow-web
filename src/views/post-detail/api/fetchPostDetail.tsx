import { PostDetail } from '@/shared/type/post/type';
import { getPostDetail } from '@/shared/api/post/getPostDetail';

export const fetchPostDetail = async (postId: string): Promise<PostDetail> => {
    try {
        // getPostDetail이 비동기 함수라면 await를 사용해야 합니다.
        const postDetail = await getPostDetail(Number(postId));

        console.log('All Post Details:', postDetail);

        return postDetail;
    } catch (error) {
        console.error('fetchPostDetail Error:', error);
        throw error; // 예외를 다시 던져서 호출자에게 알림
    }
};
