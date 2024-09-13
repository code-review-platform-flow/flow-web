import React from 'react';
import { Container } from '@/widgets/container/Container';
import Logo from '@/widgets/logo/Logo';
import styled from 'styled-components';

interface RegisterContainerProps {
    children: React.ReactNode;
}

const RegisterContainer: React.FC<RegisterContainerProps> = ({ children }) => {
    return (
        <StyledContainer border={true} size="wide" width="50%" zIndex={10}>
            <RegisterTitle>
                <Logo />
                회원가입
            </RegisterTitle>
            {children}
        </StyledContainer>
    );
};

export default RegisterContainer;

const StyledContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    gap: 1.25em;
`;

const RegisterTitle = styled.div`
    display: flex;
    gap: 0.5em;
    font-size: 1.375em;
    font-weight: 400;
`;
