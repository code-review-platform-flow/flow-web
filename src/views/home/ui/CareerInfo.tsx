'use client'
import React from 'react';
import styled from 'styled-components';
import DangguenImage from '../../../../public/images/dangguenImage.png';
import Container from '@/widgets/container/Container';
import { AutoSwiper } from './AutoSwiper'; // AutoSwiper 경로에 맞게 수정 필요
import Image from 'next/image';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { Medium } from './Font';
import Button from '@/widgets/button/Button';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import Link from 'next/link';


const careerData = [
    { index: 1, careerImage: DangguenImage, careerTitle: '당근 프론트엔드 개발자 채용 공고', job: '플랫폼',size:'100~200' ,descreption : '당근은 활발한 교류가 있는 지역 생활 커뮤니티를 꿈꿉니다. 누구나 동네에서의 즐겁고 따뜻한 연결을 경험할 수 있도록 하이퍼로컬의 새로운 길을 만들어가고 있습니다'},
    { index: 2, careerImage: DangguenImage, careerTitle: '당근 백 개발자 채용 공고', job: '플랫폼',size:'100~200' ,descreption : '당근은 활발한 교류가 있는 지역 생활 커뮤니티를 꿈꿉니다. 누구나 동네에서의 즐겁고 따뜻한 연결을 경험할 수 있도록 하이퍼로컬의 새로운 길을 만들어가고 있습니다'},
    { index: 3, careerImage: DangguenImage, careerTitle: '당근 DevOps 채용 공고' , job: '플랫폼',size:'100~200' ,descreption : '당근은 활발한 교류가 있는 지역 생활 커뮤니티를 꿈꿉니다. 누구나 동네에서의 즐겁고 따뜻한 연결을 경험할 수 있도록 하이퍼로컬의 새로운 길을 만들어가고 있습니다'},
    { index: 4, careerImage: DangguenImage, careerTitle: '당근 PM 채용 공고' , job: '플랫폼',size:'100~200' ,descreption : '당근은 활발한 교류가 있는 지역 생활 커뮤니티를 꿈꿉니다. 누구나 동네에서의 즐겁고 따뜻한 연결을 경험할 수 있도록 하이퍼로컬의 새로운 길을 만들어가고 있습니다'},
];

const CareerInfo: React.FC = () => {

    return (
        <>
            <StyledRowWrapper>
                <Medium>💼 채용 정보</Medium>
                <Link href={'/career'}>
                    <Button  size="small" tertiary label="채용바로가기" />
                </Link>
            </StyledRowWrapper>
        
            <StyledAutoSwiper>
                {careerData.map((career) => (
                    <StyledContainer key={career.index} size='small' width='100%' height='100%' round>
                        
                        <StyledRowWrapper2>
                            <CareerImage src={career.careerImage} alt='공고이미지'/>
                            <ColumnWrapper gap='0.25em'>
                                <CareerTitle>{career.careerTitle}</CareerTitle>
                                <CareerCategory>{career.job} - {career.size}</CareerCategory>
                            </ColumnWrapper>
                        </StyledRowWrapper2>
                        <CareerDescreption>
                            {career.descreption}
                        </CareerDescreption>
                    </StyledContainer>
                ))}
            </StyledAutoSwiper>
        </>
    );
};

export default CareerInfo;

const StyledRowWrapper = styled(RowWrapper)`
    width  : 100%;
    justify-content : space-between;
    margin-bottom : -1em;
`
const CareerImage = styled(Image)`
    width : 72px;
    height : 72px;
    border-radius : 1em;
    border : 0.5px solid #004E96;
`
const CareerCategory = styled.div`
    font-size :0.8125em;
    color : #333333;
`

const CareerDescreption =  styled.div`

`
const StyledAutoSwiper = styled(AutoSwiper)`
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .swiper-scrollbar {
        bottom: -30px;
    }
`;

const CareerTitle = styled.div`
    font-size:  1.125em;
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
    gap : 1em;
    color : #707070;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const StyledRowWrapper2 = styled(RowWrapper)`    
    width : 100%;
    justify-content : start;
    gap : 1em;
`