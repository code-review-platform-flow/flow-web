import React from 'react';
import styled from 'styled-components';

interface FillWrapperProps {
    children: React.ReactNode;
}

const StyledWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: #F5F5F7;
    padding-left : 1em;
    padding-right : 1em;
`;

export const FillWrapper: React.FC<FillWrapperProps> = ({ children }) => {
    return <StyledWrapper>{children}</StyledWrapper>;
};
