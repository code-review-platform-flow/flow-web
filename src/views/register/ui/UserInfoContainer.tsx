import React from 'react';
import { ErrorMessage, SemiTitle, SuccessMessage, Title } from './Font';
import Input from '@/widgets/input/Input';
import styled from 'styled-components';
import Button from '@/widgets/button/Button';
import { useRecoilState } from 'recoil';
import {  nameState, pwState, schoolEmailState, schoolNameState } from '@/app/util/register/register';
import { handleEmailAuth } from '../api/handleEmailAuth';

interface UserInfoContainerProps {
    showError?: boolean;
    registerCheck?: boolean;
}

const UserInfoContainer: React.FC<UserInfoContainerProps> = ({ showError = false, registerCheck = false }) => {
    const [name, setName] = useRecoilState(nameState);
    const [pw, setPw] = useRecoilState(pwState);
    const [schoolEmail, setSchoolEmail] = useRecoilState(schoolEmailState);
    const [schoolName, setSchoolName] = useRecoilState(schoolNameState);  

    const submitEmail = () => {
        if (!schoolName || !schoolEmail) {
            console.error('Email or School Email is missing');
            return;
        }
        handleEmailAuth(schoolName, schoolEmail);
    };
    

    return (
        <>
            <Title>사용자 정보 입력</Title>

            <Column>
                <SemiTitle>이름</SemiTitle>
                <Input size='large' placeholder='이름을 입력해주세요' value={name} onChange={(e) => setName(e.target.value)} />
                {showError && !name && <ErrorMessage>이름을 입력해주세요</ErrorMessage>}
            </Column>

            <Column>
                <SemiTitle>이메일</SemiTitle>
                <Input size='large' placeholder='example1234@gachon.ac.kr' value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)} />
                {/* 이메일 형식에 대한 정규식 검증 추가 가능 */}
                {showError && !schoolEmail && <ErrorMessage>이메일을 입력해주세요</ErrorMessage>}
            </Column>

            <Column>
                <SemiTitle>인증번호 입력</SemiTitle>
                <Input size='large' placeholder='인증번호 4자리를 입력해주세요' />
                {/* 인증번호 검증에 대한 정규식 검증 추가 가능 */}
                {showError && <ErrorMessage>인증번호가 틀렸습니다.</ErrorMessage>}
            </Column>

            <Button onClick={()=>submitEmail()} size='large' label='이메일 인증하기' />
            {/* 인증번호가 발송되었을 때 성공 메시지를 표시 */}
            {registerCheck && <SuccessMessage>인증번호가 발송되었습니다</SuccessMessage>}

            <Column>
                <SemiTitle>비밀번호</SemiTitle>
                <Input size='large' placeholder='대문자,특수문자 포함 8~15자리' value={pw} onChange={(e) => setPw(e.target.value)} />
                {/* 비밀번호 형식에 대한 정규식 검증 추가 가능 */}
                {showError && !pw && <ErrorMessage>올바른 비밀번호를 입력해주세요</ErrorMessage>}
            </Column>

            <Column>
                <SemiTitle>비밀번호 확인</SemiTitle>
                <Input size='large' placeholder='비밀번호를 한번더 입력해주세요' />
                {/* 비밀번호 확인 검증 추가 가능 */}
                {showError && <ErrorMessage>입력하신 비밀번호와 다릅니다</ErrorMessage>}
            </Column>
        </>
    );
};

export default UserInfoContainer;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;
