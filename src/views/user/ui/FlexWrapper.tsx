import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface FlexWrapperProps {
    children: ReactNode;
}

const FlexWrapper: React.FC<FlexWrapperProps> = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};

export default FlexWrapper;

const Wrapper = styled.div`
    display: flex;
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1em;
    }
`;
