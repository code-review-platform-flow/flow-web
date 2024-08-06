import Container from '@/widgets/container/Container';
import Image from 'next/image';
import React from 'react';
import TumbIcon from '../../../../public/icons/tumbCountIcon.svg';
import ShareIcon from '../../../../public/icons/shareIcon.svg';
import styled from 'styled-components';
import { SizedBox } from '@/widgets/wrapper/SizedBox';

interface ShareTumbContainerProps {
}

const ShareTumbContainer: React.FC<ShareTumbContainerProps> = ({  }) => {
    return (
        <Wrapper>
        <StyledContainer >
            <TumbShareButton>
                <ResponsiveImage src={TumbIcon} alt='tumb'/>
            </TumbShareButton>
            <SizedBox height='1.5em'/>
            <TumbShareButton>
                <ResponsiveImage src={ShareIcon} alt='share'/>
            </TumbShareButton>
        </StyledContainer>
        </Wrapper>
    );
};

export default ShareTumbContainer;

const Wrapper = styled.div`
    position : relative;
    height : 100%;
    width : 10%;
    @media (max-width: 1024px) {
        width: 15%;
    }
    @media (max-width: 768px) {
        // width: 20%;
        display : none;
    }
    // @media (max-width: 480px) {
    //     width: 25%;
    // }
`;

const StyledContainer = styled.div`
    width : auto;
    height : auto;
    padding : 1em;
    border-radius: 0.875em;
    background-color: #FFFFFF;
    color: #000000;
    position : fixed;
    top : 80px;
`;

const TumbShareButton = styled.div`
    border-radius : 100%;
    width : 32px;
    height : 32px;
    border : 1px solid #DFE3E7;
    display : flex;
    justify-content : center;
    align-items : center;
    @media (max-width: 768px) {
        width : 28px;
        height : 28px;
    }
    @media (max-width: 480px) {
        width : 24px;
        height : 24px;
    }
`;

const ResponsiveImage = styled(Image)`
    width: 70%;
    height: auto;
    @media (max-width: 768px) {
        width: 60%;
    }
    @media (max-width: 480px) {
        width: 50%;
    }
`;
