'use client';
import { useState } from 'react';
import React from 'react';
import { FillWrapper } from '@/widgets/wrapper/FillWrapper';
import LoginContainer from './ui/LoginContainer';
import Input from '@/widgets/input/Input';
import Button from '@/widgets/button/Button';
import LoginSessionCheck from './ui/LoginSessionCheck';
import FindPw from './ui/FindPw';
import RegisterButton from './ui/RegisterButton';
import styled from 'styled-components';
import getUserFromDb from './api/getUserFromDb'; // getUserFromDb 함수 가져오기
import { useRouter } from 'next/navigation';

// User 타입 정의
type User = {
    id: number;
    email: string;
    name: string;
};

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null); // 에러 메시지 상태 추가
    const [user, setUser] = useState<User | null>(null); // 로그인 성공 시 사용자 데이터 저장

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault(); // 기본 폼 제출 방지
        setErrorMsg(null); // 이전 에러 메시지 초기화

        try {
            const userData = await getUserFromDb(email, password); // getUserFromDb 함수 호출

            if (userData) {
                setUser(userData); // 로그인 성공 시 사용자 데이터 설정
                console.log('로그인 성공:', userData);
                // 로그인 성공 후 리디렉션 또는 추가 작업 수행
            } else {
                setErrorMsg('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.'); // 에러 메시지 설정
            }
        } catch (error) {
            console.error('로그인 요청 중 에러 발생:', error);
            setErrorMsg('서버와의 통신에 문제가 발생했습니다.');
        }
    };

    return (
        <FillWrapper>
            <LoginContainer>
                <LoginForm onSubmit={handleLogin}>
                    <Input size="large" placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input
                        type="password"
                        size="large"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
                    <Button type="submit" $primary size="wide" label="로그인" />
                </LoginForm>
                <Row>
                    <LoginSessionCheck />
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
