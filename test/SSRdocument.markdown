https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props

SSR 사용 시 미리 데이터 패칭 하는 방법

예시
```
import React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';

const fetchExampleData = async () => {
    const res = await fetch('https://api.example.com/data');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
    };

    const Home = () => {
    const { data, error, isLoading } = useQuery('exampleData', fetchExampleData);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
        <h1>Welcome to Next.js!</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export const getServerSideProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery('exampleData', fetchExampleData);

    return {
        props: {
        dehydratedState: dehydrate(queryClient),
        },
    };
};

export default Home;
```