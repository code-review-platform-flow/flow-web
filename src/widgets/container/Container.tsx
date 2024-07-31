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
}

export const Container = ({
    border = false,
    size = 'medium',
    height = 'auto',
    width = '100%', 
    padding = '1em', 
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
            width={width} 
            padding={padding} 
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
}>`
    border: ${({ border }) => (border ? 'solid 1px #EDEDED' : '0')};
    border-radius: 14px;
    background-color: ${({ backgroundColor }) => backgroundColor || '#FFFFFF'};
    color: #000000;
    padding: ${({ padding }) => padding}; // padding 스타일 적용
    z-index: ${({ zIndex }) => zIndex};
    
    width: ${({ width }) => width}; // width 스타일 적용
    height: ${({ height }) => height}; // height 스타일 적용

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
    }
`;

export default Container;
