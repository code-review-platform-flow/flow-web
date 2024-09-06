import React from 'react';
import styled from 'styled-components';

interface FlexWrapperProps {
    children?: React.ReactNode;
    gap?: string;
}

const FlexWrapper: React.FC<FlexWrapperProps> = ({ gap = '3.5%', children }) => {
    return <FlexContainer gap={gap}>{children}</FlexContainer>;
};

export default FlexWrapper;

const FlexContainer = styled.div<{ gap: string }>`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: ${({ gap }) => gap};
    row-gap: 1em;
    box-sizing: border-box;
    width: 100%;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;
