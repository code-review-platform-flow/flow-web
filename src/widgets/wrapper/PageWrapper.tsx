'use client'
import React from 'react';
import styled from 'styled-components';

interface PageWrapperProps {
    children: React.ReactNode;
    padding?: string;
    gap?: string; // width 속성을 추가합니다.
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, padding,gap }) => {
    return <StyledWrapper gap={gap} padding={padding}>{children}</StyledWrapper>; // width props를 전달합니다.
};

const StyledWrapper = styled.div<{ padding?: string, gap?: string}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width : 100%
    height : 100%;
    gap : ${(props) => props.gap || '1.5em'}; 
    padding-left: ${(props) => props.padding || '15%'}; 
    padding-right: ${(props) => props.padding || '15%'}; 
    @media (max-width: 768px) {   
        padding-left: 1em;
        padding-right: 1em;
    }
    padding-bottom : 1.5em;
`;
