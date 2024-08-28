import React from 'react';
import styled from 'styled-components';

interface FlexWrapperProps {
    children?: React.ReactNode;
}

const FlexWrapper: React.FC<FlexWrapperProps> = ({ children }) => {
    return <FlexContainer>{children}</FlexContainer>;
};

export default FlexWrapper;

const FlexContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 3.5%;
    row-gap: 1em; 
    width: fit-content;
    box-sizing: border-box;

    @media (max-width: 768px) {
        justify-content: center;
    }

`;
