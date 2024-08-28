import { GetServerSideProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchHallOfFameListDetail } from '@/views/hall-of-fame/api/fetchHallOfFameList';

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();

    // hallOfFameList 데이터를 prefetch
    await queryClient.prefetchQuery({
        queryKey: ['hallOfFameListDetail'],
        queryFn: ()=>fetchHallOfFameListDetail(),
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

export default getServerSideProps;
