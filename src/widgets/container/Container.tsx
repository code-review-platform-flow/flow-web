import React from 'react';
import styled from 'styled-components';

export interface ContainerProps {
    border?: boolean;
    size?: 'small' | 'medium' | 'large' | 'wide';
    height?: string;
    onClick?: () => void;
    backgroundColor?: string;
    tertiary?: boolean;
    children?: React.ReactNode;
    zIndex?: number;
    width?: string; // width 속성 추가
}

export const Container = ({
    border = false,
    size = 'medium',
    height = 'auto',
    width = '100%', // width 기본값 추가
    children,
    zIndex = 1,
    ...props
}: ContainerProps) => {
    return (
        <StyledContainer
            border={border}
            size={size}
            zIndex={zIndex}
            height={height}
            width={width} // width 전달
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
    width?: string; // width 추가
    primary?: boolean;
    backgroundColor?: string;
    tertiary?: boolean;
    zIndex: number;
}>`
    border: ${({ border }) => (border ? 'solid 1px #EDEDED' : '0')};
    border-radius: 14px;
    background-color: ${({ backgroundColor }) => backgroundColor || '#FFFFFF'}; 
    color: #000000;
    padding: 2em 2em;
    z-index: ${({ zIndex }) => zIndex};
    
    width: ${({ width }) => width}; // width 스타일 적용
    height: ${({ height }) => height}; // height 스타일 적용

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
    }
`;

export default Container;
