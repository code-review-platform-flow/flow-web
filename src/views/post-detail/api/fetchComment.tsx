import { Comment } from '@/shared/type/post';
import { getComment } from '@/shared/api/comment/getComment';

export const fetchComment = async (postId: string): Promise<Comment> => {
    try {
        // getPostDetail이 비동기 함수라면 await를 사용해야 합니다.
        const commentList = await getComment(Number(postId));

        console.log('All Comments:', commentList);

        return commentList;
    } catch (error) {
        console.error('fetchComment Error:', error);
        throw error; // 예외를 다시 던져서 호출자에게 알림
    }
};
