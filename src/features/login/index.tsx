'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FillWrapper } from '@/widgets/wrapper/FillWrapper';
import LoginContainer from './ui/LoginContainer';
import Input from '@/widgets/input/Input';
import Button from '@/widgets/button/Button';
import LoginSessionCheck from './ui/LoginSessionCheck';
import FindPw from './ui/FindPw';
import RegisterButton from './ui/RegisterButton';
import styled from 'styled-components';
import { setCookie } from 'cookies-next';
import { useRecoilState } from 'recoil';
import { authDataState } from '@/features/auth/model/atoms';
import { useLogin } from '@/features/auth/api/loginApi';

// User 타입 정의
type User = {
    id: number;
    email: string;
    name: string;
};

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [, setAuthData] = useRecoilState(authDataState);

    // useLogin 훅 사용
    const loginMutation = useLogin({
        onSuccess: (data) => {
            console.log('Login successful:', data);

            // 성공 시 토큰을 쿠키에 저장
            setCookie('accessToken', data.accessToken, { path: '/', sameSite: 'strict', secure: true });

            // 이메일을 Recoil 상태에 저장
            setAuthData({ email, role: data.role, accessToken: data.accessToken, refreshToken: data.refreshToken });

            // 로그인 성공 시 '/'로 리디렉션
            router.push('/');
        },
        onError: (error) => {
            setError('로그인에 실패했습니다. 다시 시도해주세요.');
            console.error('Login failed:', error);
        },
    });

    // 로그인 핸들러
    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setError('');
        loginMutation.mutate({ email, password });
    };

    return (
        <FillWrapper>
            <LoginContainer>
                <Input size="large" placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input
                    size="large"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <ErrorText>{error}</ErrorText>}
                <Button $primary size="large" label="로그인" onClick={handleLogin} />
                <Row>
                    <FindPw />
                </Row>
                <RegisterButton onClick={() => router.push('/register')} />
            </LoginContainer>
        </FillWrapper>
    );
};

export default LoginPage;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ErrorText = styled.p`
    color: red;
    margin: 10px 0;
`;
