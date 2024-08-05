import React from 'react';
import styled from 'styled-components';

export interface ContainerProps {
    border?: boolean;
    size?: 'small' | 'medium' | 'large' | 'wide';
    height?: string;
    width?: string; // width 속성 추가
    onClick?: () => void;
    backgroundColor?: string;
    tertiary?: boolean;
    children?: React.ReactNode;
    zIndex?: number;
    padding?: string; 
    round?: boolean;
    square?: boolean;
    animation?: boolean;
}

export const Container = ({
    border = false,
    size = 'medium',
    height = 'auto',
    width = '100%', 
    padding = '1em', 
    children,
    zIndex = 1,
    round  = false,
    square = false,
    animation = false,
    ...props
}: ContainerProps) => {
    return (
        <StyledContainer
            round={round}
            border={border}
            size={size}
            zIndex={zIndex}
            height={height}
            width={width} 
            padding={padding} 
            square={square} 
            animation={animation}
            {...props}
        >
            {children}
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{
    border: boolean;
    size: 'small' | 'medium' | 'large' | 'wide';
    height?: string;
    width?: string; 
    primary?: boolean;
    backgroundColor?: string;
    tertiary?: boolean;
    zIndex: number;
    padding: string; 
    round : boolean;
    square?: boolean;
    animation?: boolean;
}>`
    border: ${({ border }) => (border ? 'solid 1px #EDEDED' : '0')};
    border-radius: ${({round}) => (round ? '1.5em' : '0.875em')};
    background-color: ${({ backgroundColor }) => backgroundColor || '#FFFFFF'};
    color: #000000;
    padding: ${({ padding }) => padding}; // padding 스타일 적용
    z-index: ${({ zIndex }) => zIndex};
    width: ${({ width }) => width}; 
    width: ${({ width, square }) => (square ? 'auto' : width)};
    height: ${({ height, square, width }) => (square ? width : height)};

    @media (max-width: 768px) {
        width: 100%; 
        max-width: 100%;
        height: ${({ square,width }) => (square ? width : 'auto')};
    }

    &:hover{
        filter: ${({animation}) => (animation ? 'drop-shadow(0px 16px 20px rgba(0, 0, 0, 0.05))' : '')};
        transform: ${({animation}) => (animation ? 'translateY(-5px)' : '')}; 
        transition-duration: 0.5s
    }
    

    
`;

export default Container;
