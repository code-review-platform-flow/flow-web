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

        // JSON 형식의 응답을 받아온다
        const data = await response.json();

        console.log('Trending Posts:', data); // 반환된 데이터를 출력

        // 반환된 데이터의 타입을 지정해주기 위해 명시적으로 변환
        return data as PostSummary[];
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

        // JSON 형식의 응답을 특정 타입으로 반환
        const data = await response.json();
        return data as PostDetail;
    } catch (error) {
        console.error(`getPostDetail Error for postId ${postId}:`, error);
        throw error; // 예외를 다시 던져서 호출자에게 알림
    }
};

// 모든 Trending Post의 상세 정보를 가져오는 함수
export const fetchTrendingPostDetails = async (context: QueryFunctionContext<Readonly<[string, number, number]>>): Promise<PostDetail[]> => {
    try {
        // queryKey에서 page와 count를 추출합니다.
        const [, page, count] = context.queryKey;

        // Trending Post 리스트를 가져옴
        const trendingPosts = await fetchTrendingPostList(page, count);

        // 각 포스트의 상세 정보를 가져오는 작업을 병렬로 수행
        const postDetailsPromises = trendingPosts.map((post) => getPostDetail(post.postId));

        // 모든 상세 정보를 가져올 때까지 대기
        const postDetails = await Promise.all(postDetailsPromises);

        console.log('All Post Details:', postDetails); // 모든 게시물의 상세 정보를 출력

        return postDetails;
    } catch (error) {
        console.error('fetchTrendingPostDetails Error:', error);
        throw error; // 예외를 다시 던져서 호출자에게 알림
    }
};
