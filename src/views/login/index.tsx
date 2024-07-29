'use client'

import React from "react";
import { FillWrapper } from '@/widgets/wrapper/FillWrpper';
import LoginContainer from "./ui/LoginContainer";
import Input from "@/widgets/input/Input";
import Button from "@/widgets/button/Button";
import LoginSessionCheck from "./ui/LoginSessionCheck";
import FindPw from "./ui/FindPw";
import RegisterButton from "./ui/RegisterButton";
import styled from "styled-components";

const LoginPage: React.FC = () => {
    
    return (
        <FillWrapper>
            <LoginContainer>
                <Input size="large" placeholder="아이디"/>
                <Input size="large" placeholder="비밀번호"/>
                <Button primary size="large" label="로그인"/>
                <Row>
                    <LoginSessionCheck/>
                    <FindPw/>
                </Row>
                <RegisterButton/>
            </LoginContainer>
        </FillWrapper>
    );
}

export default LoginPage;

const Row = styled.div`
    display : flex;
    justify-content : space-between;
`