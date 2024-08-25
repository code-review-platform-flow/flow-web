'use client';
import BackButton from '@/widgets/button/BackButton';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import CareerInfo from '../home/ui/CareerInfo';
import GridWrapper from '../trending-post/ui/GridWrapper';
import CareerContainer from './ui/CareerContainer';

interface CareerPageProps {}

const CareerPage: React.FC<CareerPageProps> = ({}) => {
    return (
        <PageWrapper padding="25%">
            <BackButton label="💼  채용 정보" />
            <GridWrapper>
                <CareerContainer />
            </GridWrapper>
        </PageWrapper>
    );
};

export default CareerPage;
