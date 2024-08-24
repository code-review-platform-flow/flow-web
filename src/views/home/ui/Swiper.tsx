import React, { ReactNode, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface SwiperProps {
    children: ReactNode;
}

const Swiper: React.FC<SwiperProps> = ({ children }) => {
    const swiperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const swiper = swiperRef.current;
        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        if (swiper) {
            const handleMouseDown = (e: MouseEvent) => {
                isDown = true;
                startX = e.pageX - swiper.offsetLeft;
                scrollLeft = swiper.scrollLeft;
            };

            const handleMouseLeave = () => {
                isDown = false;
            };

            const handleMouseUp = () => {
                isDown = false;
            };

            const handleMouseMove = (e: MouseEvent) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - swiper.offsetLeft;
                const walk = (x - startX) * 3; // 스와이프 속도 조절
                swiper.scrollLeft = scrollLeft - walk;
            };

            swiper.addEventListener('mousedown', handleMouseDown);
            swiper.addEventListener('mouseleave', handleMouseLeave);
            swiper.addEventListener('mouseup', handleMouseUp);
            swiper.addEventListener('mousemove', handleMouseMove);

            return () => {
                swiper.removeEventListener('mousedown', handleMouseDown);
                swiper.removeEventListener('mouseleave', handleMouseLeave);
                swiper.removeEventListener('mouseup', handleMouseUp);
                swiper.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []);

    return <SwiperWrapper ref={swiperRef}>{children}</SwiperWrapper>;
};

export default Swiper;

const SwiperWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5em;
    width: 100%;
    height: 100%;

    @media (max-width: 768px) {
        display: flex;
        overflow-x: auto;
        scroll-snap-type: x mandatory;

        & > * {
            flex: 0 0 268px;
            scroll-snap-align: start;
        }
    }
`;
