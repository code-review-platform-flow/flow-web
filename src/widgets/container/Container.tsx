import React from 'react';
import styled from 'styled-components';

export interface ContainerProps {
    border?: boolean;
    size?: 'small' | 'medium' | 'large' | 'wide';
    onClick?: () => void;
    backgroundColor?: string;
    tertiary?: boolean;
    children?: React.ReactNode;
    zIndex?: number; // z-index 추가
}

export const Container = ({
    border = false,
    size = 'medium',
    children,
    zIndex = 1, // 기본 z-index 설정
    ...props
}: ContainerProps) => {
    return (
        <StyledContainer
            border={border}
            size={size}
            zIndex={zIndex} // z-index 전달
            {...props}
        >
            {children}
        </StyledContainer>
    );
};

const StyledContainer = styled.div<{ border: boolean; size: 'small' | 'medium' | 'large' | 'wide'; primary?: boolean; backgroundColor?: string; tertiary?: boolean; zIndex: number }>`
    border: ${({ border }) => (border ? 'solid 1px #EDEDED' : '0')};
    border-radius: 14px;
    background-color: ${({ backgroundColor }) => backgroundColor || '#FFFFFF'}; 
    color: #000000;
    padding: 2em 2em;
    z-index: ${({ zIndex }) => zIndex}; // z-index 스타일 추가
    min-height: ${({ size }) => {
        switch (size) {
            case 'small':
                return '268px';
            case 'medium':
                return '200px';
            case 'large':
                return 'auto';
            case 'wide':
                return 'auto';
            default:
                return '268px';
        }
    }};

    width: ${({ size }) => (size === 'wide' ? '50%' : 'auto')};

    max-width: ${({ size }) => {
        switch (size) {
            case 'small':
                return '268px';
            case 'medium':
                return '200px';
            case 'large':
                return 'auto';
            case 'wide':
                return '100%';
            default:
                return '268px';
        }
    }};

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
    }
`;

export default Container;
