import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface SwiperProps {
    children: ReactNode;
}

const Swiper: React.FC<SwiperProps> = ({ children }) => {
    return (
        <SwiperWrapper>
            {children}
        </SwiperWrapper>
    );
};

export default Swiper;


const SwiperWrapper = styled.div`
    display : grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5em;
    width: 100%;
    height: 100%;  
`