'use client';
import React from 'react';
import styled from 'styled-components';

interface PageWrapperProps {
    children: React.ReactNode;
    padding?: string;
    gap?: string; // width 속성을 추가합니다.
    height?: string;
    marginTop?: string;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, padding, gap, height, marginTop }) => {
    return (
        <StyledWrapper height={height} gap={gap} padding={padding} marginTop={marginTop}>
            {children}
        </StyledWrapper>
    ); // width props를 전달합니다.
};

const StyledWrapper = styled.div<{ padding?: string; gap?: string; height?: string; marginTop?: string }>`
    margin-top: ${(props) => props.marginTop || '80px'};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${(props) => props.height || 'auto'};
    gap: ${(props) => props.gap || '1.5em'};
    padding-left: ${(props) => props.padding || '15%'};
    padding-right: ${(props) => props.padding || '15%'};
    @media (max-width: 768px) {
        padding-left: 1em;
        padding-right: 1em;
    }
    padding-bottom: 1.5em;
`;
