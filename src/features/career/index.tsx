'use client';
import BackButton from '@/widgets/button/BackButton';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import FlexWrapper from '../../widgets/wrapper/FlexWrapper';
import CareerContainer from './ui/CareerContainer';

interface CareerPageProps {}

const CareerPage: React.FC<CareerPageProps> = ({}) => {
    return (
        <PageWrapper padding="15%">
            <BackButton label="💼  채용 정보" />
            <FlexWrapper>
                <CareerContainer />
            </FlexWrapper>
        </PageWrapper>
    );
};

export default CareerPage;
