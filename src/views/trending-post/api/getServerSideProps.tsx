import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchTrendingPostDetails } from '@/views/trending-post/api/fetchTrendingPostList';

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();

    // trendingPostDetails 데이터를 prefetch
    // page와 count는 예시로 1과 10을 사용했습니다.
    await queryClient.prefetchQuery({
        queryKey: ['trendingPostDetails', 1, 9],
        queryFn: ()=>fetchTrendingPostDetails()
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default getServerSideProps;
