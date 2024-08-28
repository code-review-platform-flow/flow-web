import Container from '@/widgets/container/Container';
import React from 'react';
import { SemiTitle, YearDescription, YearTitle } from './Font';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import styled from 'styled-components';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';

interface UserCareerContainerProps {}

const UserCareerContainer: React.FC<UserCareerContainerProps> = ({}) => {
    const user = {
        name: '홍길동',
        univName: '가천대',
        department: '컴퓨터공학과',
        careerEnterYear: '2022',
        careerQuitYear: '2024',
        careerName: 'aitstory',
        careerProduct: 'T Map 전기차 플렛폼',
        careerDetailTask: [
            '전기차 플랫폼 신규 백엔드 (2.0)',
            'Layer architecture 설계 및 구현',
            '충전소 충전기 인증 및 충전 프로세스 기능 구현',
            '쿠폰 프로세스 기능 구현',
            '결제 프로세스 기능 구현',
            'Rabbit MQ를 사용하여 결제 기능 구현',
            '테스트 코드 도입 및 테스트 코드를 사용하여 swagger 자동화 구현',
        ],
    };

    return (
        <Container width="100%">
            <SemiTitle>이력</SemiTitle>
            <SizedBox height="0.5em" />

            <GridWrapper>
                <YearTitle>
                    {user.careerEnterYear} ~ {user.careerQuitYear}
                </YearTitle>
                <YearDescription>{user.careerName}</YearDescription>

                <CareerCategory>프로덕트</CareerCategory>
                <ColumnWrapper gap="0.8125em">
                    <CareerProduct>T Map 전기차 플렛폼</CareerProduct>
                    <ColumnWrapper gap="0.25em">
                        {user.careerDetailTask &&
                            user.careerDetailTask.map((detail, index) => (
                                <CareerDetailTask key={index}>• {detail}</CareerDetailTask>
                            ))}
                    </ColumnWrapper>
                </ColumnWrapper>
            </GridWrapper>
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
