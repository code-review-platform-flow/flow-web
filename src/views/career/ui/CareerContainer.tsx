import React from 'react';
import styled from 'styled-components';
import DangguenImage from '../../../../public/images/dangguenImage.png';
import Container from '@/widgets/container/Container';
import Image from 'next/image';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { CareerDetail } from '../model/type';
import { fetchCareerListDetail } from '../api/fetchCareerList';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface CareerContainerProps {}

const CareerContainer: React.FC<CareerContainerProps> = ({}) => {
    const router = useRouter();

    const {
        data: careerData = [],
        isLoading,
        error,
    } = useQuery<CareerDetail[]>({
        queryKey: ['careerList'],
        queryFn: () => fetchCareerListDetail(),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.log(error);
        return <div>오류가 발생했습니다.</div>;
    }

    return (
        <>
            {careerData &&
                careerData.map((career, index) => (
                    <StyledContainer
                        onClick={() => router.push(`${career.redirectUrl}`)}
                        key={index}
                        size="small"
                        width="100%"
                        height="100%"
                        round
                    >
                        <StyledRowWrapper2>
                            <CareerImage width={44} height={44} src="/images/dangguenImage.png" alt="공고이미지" />
                            <ColumnWrapper gap="0.25em">
                                <CareerTitle>{career.title}</CareerTitle>
                                <CareerCategory>{career.subtitle}</CareerCategory>
                            </ColumnWrapper>
                        </StyledRowWrapper2>
                        <CareerDescreption>{career.description}</CareerDescreption>
                    </StyledContainer>
                ))}
        </>
    );
};

export default CareerContainer;

const CareerImage = styled(Image)`
    width: 72px;
    height: 72px;
    border-radius: 1em;
    border: 0.5px solid #004e96;
`;
const CareerCategory = styled.div`
    font-size: 0.8125em;
    color: #333333;
`;

const CareerDescreption = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    min-height: 6.25em;
    max-height: 100%;
    line-height: 1.25em;
    white-space: normal;

    @media (max-width: 768px) {
        /* 모바일 화면에서는 줄 수와 글자 크기 변경 */
        -webkit-line-clamp: 3; /* 줄 수를 줄임 */
        font-size: 0.9rem; /* 글자 크기 줄임 */
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        /* 태블릿 화면 */
        -webkit-line-clamp: 4; /* 태블릿에서는 중간 정도의 줄 수 설정 */
        font-size: 1rem; /* 글자 크기 */
    }

    @media (min-width: 1025px) {
        /* 데스크톱 화면 */
        -webkit-line-clamp: 5; /* 기본 줄 수 유지 */
        font-size: 1.1rem; /* 약간 큰 글자 크기 */
    }
`;

const CareerTitle = styled.div`
    font-size: 1.125em;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 14ch;
`;

const StyledContainer = styled(Container)`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    flex-direction: column;
    gap: 1em;
    color: #707070;
    overflow: hidden;
    text-overflow: ellipsis;

    min-width: 280px;
    max-width: 31%;
    min-height: 100%;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const StyledRowWrapper2 = styled(RowWrapper)`
    width: 100%;
    justify-content: start;
    gap: 1em;
`;
