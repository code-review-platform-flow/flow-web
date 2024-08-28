'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import GridWrapper from './ui/GridWrapper';
import BackButton from '@/widgets/button/BackButton';
import TrendingPostContainer from './ui/TrendingPostContainer';


const TrendingPostPage: React.FC = () => {
    return (
        <PageWrapper padding="15%">
            <BackButton label="️🔥 트렌딩 포스트" />
            <GridWrapper>
                <TrendingPostContainer />
            </GridWrapper>
        </PageWrapper>
    );
};

export default TrendingPostPage;
