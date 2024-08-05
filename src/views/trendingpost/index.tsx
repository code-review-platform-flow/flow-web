'use client'
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import GridWrapper from './ui/GridWrapper';
import BackButton from '@/widgets/button/BackButton';
import TrendingPostContainer from './ui/TrendingPostContainer';

interface indexProps {
}

const index: React.FC<indexProps> = ({  }) => {
    return (
        <PageWrapper padding='20%'>
            <BackButton label='️🔥 트렌딩 포스트'/>
            <GridWrapper>
                <TrendingPostContainer/>
            </GridWrapper>
        </PageWrapper>
    );
};

export default index;