'use client'
import { useState } from "react";
import React from "react";
import { FillWrapper } from '@/widgets/wrapper/FillWrapper';
import LoginContainer from "./ui/LoginContainer";
import Input from "@/widgets/input/Input";
import Button from "@/widgets/button/Button";
import LoginSessionCheck from "./ui/LoginSessionCheck";
import FindPw from "./ui/FindPw";
import RegisterButton from "./ui/RegisterButton";
import styled from "styled-components";

// import { authenticate } from "./api/authAction"
import { useFormState } from "react-dom";

const LoginPage: React.FC = () => {
    // const [errorMsg, dispatch] = useFormState(authenticate, undefined)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const data = {
        email,
        password
    }

    const handleLogin = async () => {
    }

    return (
        <FillWrapper>
            <LoginContainer>
                <LoginForm 
                // action={dispatch}
                >
                    <Input 
                        size="large" 
                        placeholder="아이디" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <Input 
                        type='password' 
                        size="large" 
                        placeholder="비밀번호" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {/* {errorMsg && <ErrorText>{errorMsg}</ErrorText>} */}
                    <Button type="submit" $primary size="wide" label="로그인"/>
                </LoginForm>
                <Row>
                    <LoginSessionCheck />
                    <FindPw />
                </Row>
                <RegisterButton />
            </LoginContainer>
        </FillWrapper>
    );
};

export default LoginPage;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1em;
`;

const ErrorText = styled.p`
    color: red;
    margin: 10px 0;
    font-size: 0.8125em;
`;
