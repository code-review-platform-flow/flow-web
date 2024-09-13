import { UserSummary } from '@/shared/type/user';
import { fetchCareerListDetail } from '@/features/career/api/fetchCareerList';
import { CareerDetail } from '@/features/career/model/type';
import { fetchHallOfFameListDetail } from '@/features/hall-of-fame/api/fetchHallOfFameList';
import { fetchTrendingPostDetails } from '@/features/trending-post/api/fetchTrendingPostList';
import { PostDetail } from '@/shared/type/post';
import { fetchNewPost } from './fetchNewPost';

// 홈 데이터 가져오는 함수
export const fetchHomeData = async (): Promise<{
    careers: CareerDetail[];
    posts: PostDetail[];
    hallOfFame: UserSummary[];
    newPost: number;
}> => {
    try {
        const [careerList, trendingPostList, hallOfFameList, newPostId] = await Promise.all([
            fetchCareerListDetail(),
            fetchTrendingPostDetails(1, 3),
            fetchHallOfFameListDetail(3),
            fetchNewPost(),
        ]);

        console.log('Career List:', careerList);
        console.log('Trending Post List:', trendingPostList);
        console.log('Hall of Fame List:', hallOfFameList);
        console.log('NewPost:', newPostId);

        return {
            careers: careerList,
            posts: trendingPostList,
            hallOfFame: hallOfFameList,
            newPost: newPostId,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('홈 데이터를 가져오는 중 오류가 발생했습니다.');
    }
};
