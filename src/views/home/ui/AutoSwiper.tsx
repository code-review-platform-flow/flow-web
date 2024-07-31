import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export interface AutoSwiperProps {
    children?: React.ReactNode;
}

interface CustomCSSProperties extends React.CSSProperties {
    '--swiper-pagination-color'?: string;
    '--swiper-pagination-bullet-inactive-color'?: string;
    '--swiper-pagination-bullet-inactive-opacity'?: string;
    '--swiper-pagination-bullet-size'?: string;
    '--swiper-pagination-bullet-horizontal-gap'?: string;
}

export const AutoSwiper = ({
    children
}: AutoSwiperProps) => {
    const swiperStyle: CustomCSSProperties = {
        width: '100%',
        height: '270px',
        '--swiper-pagination-color': '#004E96',
        '--swiper-pagination-bullet-inactive-color': '#E3F0FC',
        '--swiper-pagination-bullet-inactive-opacity': '1',
        '--swiper-pagination-bullet-size': '0.575em',
        '--swiper-pagination-bullet-horizontal-gap': '6px',
    };

    return (
        <Swiper
            modules={[Pagination, Autoplay]} 
            spaceBetween={24} 
            slidesPerView={3}
            loop={true} 
            autoplay={{ delay: 3000 }} 
            style={swiperStyle}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }}
        >
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index} style={{ width: '300px', height: '230px' }}>
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
