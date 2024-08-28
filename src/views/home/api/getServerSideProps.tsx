import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchHomeData } from '@/views/home/api/fetchHomeData';

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['fetchHomeData'],
        queryFn: fetchHomeData,
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default getServerSideProps;
