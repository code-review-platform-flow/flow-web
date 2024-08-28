import { PostSummary, PostDetail } from '../model/type';
import ky from 'ky';
import { QueryFunctionContext } from '@tanstack/react-query';

// Trending Post 리스트를 가져오는 함수
const fetchTrendingPostList = async (page: number, count: number): Promise<PostSummary[]> => {
    try {
        const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/tranding/${page}/${count}`);

        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }

            // data의 타입을 명확히 정의합니다.
        const data: { trandingPostsList: PostSummary[] } = await response.json();

        console.log('Trending Posts:', data.trandingPostsList);

        return data.trandingPostsList as PostSummary[];
    } catch (error) {
        console.error('fetchTrendingPostList Error:', error);
        throw error; // 예외를 다시 던져서 호출자에게 알림
    }
};

// 특정 게시물의 상세 정보를 가져오는 함수
const getPostDetail = async (postId: number): Promise<PostDetail> => {
    try {
        const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`);

        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log(data)
        return data as PostDetail;

    } catch (error) {
        console.error(`getPostDetail Error for postId ${postId}:`, error);
        throw error; 
    }
};

// 모든 Trending Post의 상세 정보를 가져오는 함수
export const fetchTrendingPostDetails = async (context: QueryFunctionContext<Readonly<[string, number, number]>>): Promise<PostDetail[]> => {
    try {
        const [, page, count] = context.queryKey;
        const trendingPosts = await fetchTrendingPostList(page, count);
        const postDetailsPromises = trendingPosts && trendingPosts.map((post) => getPostDetail(post.postId));
        const postDetails = await Promise.all(postDetailsPromises);

        console.log('All Post Details:', postDetails); 

        return postDetails;
    } catch (error) {
        console.error('fetchTrendingPostDetails Error:', error);
        throw error; // 예외를 다시 던져서 호출자에게 알림
    }
};
