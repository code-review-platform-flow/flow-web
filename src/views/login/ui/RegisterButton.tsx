import React from 'react';
import styled from 'styled-components';

const RegisterButton = () => {
    return (
        <Styled>
            회원가입
        </Styled>
    );
};

export default RegisterButton;

const Styled = styled.div`
    align-self : center;
    color  : #737373;
    font-size : 0.8125em;
    text-decoration : underline;
`