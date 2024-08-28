import React from 'react';
import Image from 'next/image';
import hallOfFameFrame from '../../../../public/images/hallofFameFrame.png';
import styled from 'styled-components';

interface HallOfFameFrameProps {
    children?: React.ReactNode;
}

const HallOfFameFrame: React.FC<HallOfFameFrameProps> = ({ children }) => {
    return (
        <Frame>
            <StyledImageWrapper>
                <Image src={hallOfFameFrame} alt="명예의전당배경" layout="fill" objectFit="cover" />
            </StyledImageWrapper>
            <Children>
                <BackDrop/>
                {children}
            </Children>
        </Frame>
    );
};

export default HallOfFameFrame;

const Frame = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
`;

const StyledImageWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;

    @media (max-width: 768px) {
        display: none;
    }
`;

const Children = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    height: 100%;
    padding: 0em 8.5em;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
        padding: 1em 1em;
    }
`;

const BackDrop = styled.div`
    position: absolute;
    background-color: #f5f5f7;
    height: 100%;
`;
