import Container from '@/widgets/container/Container';
import React from 'react';
import styled from 'styled-components';
import WriteIcon from '../../../../public/icons/writeIcon.svg';
import Image from 'next/image';

const WriteContainer = () => {
    return (
        <StyledContainer size='wide'>
            <Image src={WriteIcon} alt='쓰기 아이콘'/>
            어떤 이야기를 나누고 싶나요?
        </StyledContainer>
    );
};

export default WriteContainer;

const StyledContainer = styled(Container)`  
    display : flex;
    align-items : center;
    font-size : 0.8125em;
    color : #8E8E8E;
    justify-content : start;
    padding-top : 1em;
    padding-bottom : 1em;
    gap : 1em;
`