'use client'

import { PageWrapper } from "@/widgets/wrapper/PageWrapper";
import CarrerInfo from "./ui/CarrerInfo";
import CoffeeChatList from "./ui/CoffeeChatList";
import HallofFameList from "./ui/HallofFameList";
import RecentPost from "./ui/RecentPost";
import Swiper from "./ui/Swiper";
import TrendingPostList from "./ui/TrendingPostList";
import WriteContainer from "./ui/WriteContainer";

export default function HomePage() {

    return (
        <PageWrapper padding="15%">
            <WriteContainer/>
            <RecentPost/>
            <Swiper>
                <HallofFameList/>
                <CoffeeChatList/>
                <TrendingPostList/>
            </Swiper>
            <CarrerInfo/>
        </PageWrapper>
    );
    }
