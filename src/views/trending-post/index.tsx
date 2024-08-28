'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import FlexWrapper from '../../widgets/wrapper/FlexWrapper';
import BackButton from '@/widgets/button/BackButton';
import TrendingPostContainer from './ui/TrendingPostContainer';


const TrendingPostPage: React.FC = () => {
    return (

        <PageWrapper padding="15%">
            <BackButton label="️🔥 트렌딩 포스트" />
            <FlexWrapper>
                <TrendingPostContainer />
            </FlexWrapper>
        </PageWrapper>
    );
};

export default TrendingPostPage;
