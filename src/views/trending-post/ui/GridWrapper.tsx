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
    display: flex;
    justify-content : center;
    width : 100%;
    flex-wrap : wrap;
    gap: 1.5em;
    @media(max-width : 768px){
        flex-wrap : no-wrap;
        justify-content : center;
    }
`;
