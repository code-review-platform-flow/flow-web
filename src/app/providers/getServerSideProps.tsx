import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import {  fetchHallOfFameListDetail } from '@/views/hall-of-fame/api/fetchHallOfFameList';
import { fetchTrendingPostDetails } from '@/views/trending-post/api/fetchTrendingPostList';
import { fetchCareerListDetail } from '@/views/career/api/fetchCareerList';

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();

    // hallOfFameList 데이터를 prefetch
    await queryClient.prefetchQuery({
        queryKey: ['hallOfFameListDetail'],
        queryFn: fetchHallOfFameListDetail,
    });

    // trendingPostDetails 데이터를 prefetch
    // page와 count는 예시로 1과 10을 사용했습니다.
    const page = 1;
    const count = 10;
    await queryClient.prefetchQuery({
        queryKey: ['trendingPostDetails', page, count],
        queryFn: fetchTrendingPostDetails,
    });

    await queryClient.prefetchQuery({
        queryKey: ['fetchCareerListDetail'],
        queryFn: fetchCareerListDetail,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default getServerSideProps;
