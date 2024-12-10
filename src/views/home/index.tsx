'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import CoffeeChatList from './ui/CoffeeChatList';
import HallofFameList from './ui/HallofFameList';
import Swiper from './ui/Swiper';
import TrendingPostList from './ui/TrendingPostList';
import WriteContainer from './ui/WriteContainer';
import CareerInfo from './ui/CareerInfo';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from './api/fetchHomeData';
import SmallPostContainer from '@/widgets/postContainer/SmallPostContainer';
import { useEffect, useState } from 'react';
import { getPostDetail } from '@/shared/api/post/getPostDetail';
import { PostDetail } from '@/shared/type/post';

export default function HomePage() {
    const [newPostDetail, setNewPostDetail] = useState<PostDetail>();

    // useQuery를 컴포넌트 최상위 레벨에서 호출
    const { data: homeData = { careers: [], posts: [], hallOfFame: [], newPost: 0 } } = useQuery({
        queryKey: ['fetchhomeData'],
        queryFn: () => fetchHomeData(),
    });

    useEffect(() => {
        const fetchNewPostDetail = async () => {
            if (homeData.newPost) {
                try {
                    const detail = await getPostDetail(homeData.newPost);
                    setNewPostDetail(detail);
                } catch (error) {
                    console.error('Failed to fetch new post detail:', error);
                }
            }
        };

        fetchNewPostDetail();
    }, [homeData.newPost]);

    return (
        <PageWrapper padding="15%">
            <>
                <WriteContainer />
                {newPostDetail && <SmallPostContainer postData={newPostDetail} />}
            </>
            <Swiper>
                <HallofFameList hallOfFameData={homeData.hallOfFame} />
                <CoffeeChatList coffechatData={homeData.hallOfFame} />
                <TrendingPostList trendingPostList={homeData.posts} />
            </Swiper>
            <>
                <CareerInfo careers={homeData.careers} />
            </>
        </PageWrapper>
    );
}
