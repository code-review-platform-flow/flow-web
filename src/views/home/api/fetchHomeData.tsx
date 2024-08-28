import { User } from '@/entities/user/model/type';
import { fetchCareerListDetail } from '@/views/career/api/fetchCareerList';
import { CareerDetail } from '@/views/career/model/type';
import { fetchHallOfFameListDetail } from '@/views/hall-of-fame/api/fetchHallOfFameList';
import { fetchTrendingPostDetails } from '@/views/trending-post/api/fetchTrendingPostList';
import { PostDetail } from '@/views/trending-post/model/type';

// 홈 데이터 가져오는 함수
export const fetchHomeData = async (): Promise<{ careers: CareerDetail[]; posts: PostDetail[]; hallOfFame: User[] }> => {
    try {
        const [careerList, trendingPostList, hallOfFameList] = await Promise.all([
            fetchCareerListDetail(),
            fetchTrendingPostDetails(1, 3),
            fetchHallOfFameListDetail(3),
        ]);
        console.log('Career List:', careerList);
        console.log('Trending Post List:', trendingPostList);
        console.log('Hall of Fame List:', hallOfFameList);
        return {
            careers: careerList,
            posts: trendingPostList,
            hallOfFame: hallOfFameList,
        };
    } catch (error) {
        console.error('Error fetching Career List:', error);
        console.error('Error fetching Trending Post List:', error);
        console.error('Error fetching Hall of Fame List:', error);
        throw new Error('홈 데이터를 가져오는 중 오류가 발생했습니다.');
    }
};
