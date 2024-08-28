import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchCareerListDetail } from '@/views/career/api/fetchCareerList';

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();

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
