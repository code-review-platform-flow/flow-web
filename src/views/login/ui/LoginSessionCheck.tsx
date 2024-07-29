import React from 'react';
import styled from 'styled-components';


const LoginSessionCheck = () => {
    return (
        <Container>
        <Checkbox type="checkbox"/>
            로그인 유지
        </Container>
    );
};

export default LoginSessionCheck;

const Container = styled.div`
    display: flex;
    align-items: center;
    color : #737373;
    font-size : 0.8125em;
`;

const Checkbox = styled.input`
    margin-right: 8px;  
    outline: none;
    border: 1px solid #737373;
`;
