'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import CoffeeChatList from './ui/CoffeeChatList';
import HallofFameList from './ui/HallofFameList';
import RecentPost from './ui/RecentPost';
import Swiper from './ui/Swiper';
import TrendingPostList from './ui/TrendingPostList';
import WriteContainer from './ui/WriteContainer';
import CareerInfo from './ui/CareerInfo';
import { useQuery } from '@tanstack/react-query';
import { fetchHomeData } from './api/fetchHomeData';
import { fetchHallOfFameListDetail } from '../hall-of-fame/api/fetchHallOfFameList';


export default function HomePage() {

    const { data: homeData = {careers: [], posts: [], hallOfFame: []} } = useQuery({
        queryKey: ['fetchhomeData'],
        queryFn: () => fetchHomeData(),
    });

    console.log(homeData.careers);
    console.log(homeData.posts);
    console.log(homeData.hallOfFame);

    return (
        <PageWrapper padding="15%">
            <>
                <WriteContainer />
                <RecentPost />
            </>
            <Swiper>
                <HallofFameList 
                // hallOfFame={hallOfFame} 
                />
                <CoffeeChatList />
                <TrendingPostList 
                // posts={posts} 
                />
            </Swiper>
            <>
                <CareerInfo careers={homeData.careers} />
            </>
        </PageWrapper>
    );
}
