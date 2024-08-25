import React from 'react';
import styled from 'styled-components';

interface GridWrapperProps {
    children?: React.ReactNode;
}

const GridWrapper: React.FC<GridWrapperProps> = ({ children }) => {
    return <GridContainer>{children}</GridContainer>;
};

export default GridWrapper;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5em;
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 450px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;
