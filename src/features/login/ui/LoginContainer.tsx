import React from 'react';
import { Container } from '@/widgets/container/Container';
import Logo from '@/widgets/logo/Logo';
import styled from 'styled-components';

interface LoginContainerProps {
    children: React.ReactNode;
}

const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {
    return (
        <StyledContainer border={true} size="wide" width="50%" zIndex={10}>
            <LoginTitle>
                <Logo />
            </LoginTitle>
            {children}
        </StyledContainer>
    );
};

export default LoginContainer;

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    gap: 1.25em;
`;

const LoginTitle = styled.div`
    align-self: center;
`;
