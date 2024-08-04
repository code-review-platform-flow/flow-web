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
            <Image
                src={hallOfFameFrame}
                alt='명예의전당배경'
                layout='fill'
                objectFit='cover'
            />
            <Children>
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
`
const Children = styled.div`
    position: absolute;
    top : 0;
    left : 0;
    width: 100%;
    height: 100%;
    padding : 0em 5.5em;

`