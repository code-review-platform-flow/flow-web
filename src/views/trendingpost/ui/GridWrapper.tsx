
import React from 'react';
import styled from 'styled-components';

interface GridWrapperProps {
    children?: React.ReactNode
}

const GridWrapper: React.FC<GridWrapperProps> = ({ children }) => {
    return (
        <GridContainer>
            {children}  
        </GridContainer>
    );
};

export default GridWrapper;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr)
    gap: 1.5em;
`;