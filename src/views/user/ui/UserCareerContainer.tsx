import Container from '@/widgets/container/Container';
import React, { useEffect, useState } from 'react';
import { SemiTitle, YearDescription, YearTitle } from './Font';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import styled from 'styled-components';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { Career, CareerData } from '@/shared/type/user';
import { getCareer } from '../api/getCareer';

interface UserCareerContainerProps {
    careerList: Career[]; // 이력 목록
    own: boolean;
}

const UserCareerContainer: React.FC<UserCareerContainerProps> = ({ careerList, own }) => {
    const [careerData, setCareerData] = useState<CareerData[]>([]);

    useEffect(() => {
        const fetchCareerData = async () => {
            console.log('이력 정보 불러오기');
            try {
                const data = await Promise.all(careerList.map((career) => getCareer(career.careerId)));
                setCareerData(data);
                console.log(data);
            } catch (error) {
                console.error('Career data fetching error:', error);
            }
        };

        fetchCareerData();
    }, [careerList]);

    return (
        <Container width="100%">
            <SemiTitle>이력</SemiTitle>
            <SizedBox height="0.5em" />
            {careerData.map((career, index) => (
                <GridWrapper key={index}>
                    <YearTitle>
                        {career.startDate} ~ {career.endDate}
                    </YearTitle>
                    <YearDescription>{career.title}</YearDescription>
                    <CareerCategory>{career.title}</CareerCategory>
                    <ColumnWrapper gap="0.8125em">
                        <CareerProduct>{career.title}</CareerProduct>
                        <ColumnWrapper gap="0.25em">
                            <CareerDetailTask>{career.description}</CareerDetailTask>
                        </ColumnWrapper>
                    </ColumnWrapper>
                </GridWrapper>
            ))}
        </Container>
    );
};

export default UserCareerContainer;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 8fr;
    row-gap: 1em;
`;
const CareerCategory = styled.div`
    padding-left: 1em;
    box-sizing: border-box;
    font-size: 0.8125em;
    color: #999999;
`;
const CareerProduct = styled.div`
    font-size: 0.8125em;
`;

const CareerDetailTask = styled.div`
    font-size: 0.75em;
    opacity: 50%;
`;
