import React, { useState } from 'react';
import { ErrorMessage, SemiTitle, SuccessMessage, Title } from './Font';
import Input from '@/widgets/input/Input';
import styled from 'styled-components';
import Button from '@/widgets/button/Button';
import { useRecoilState } from 'recoil';
import { nameState, schoolEmailState, schoolNameState, studentNumberState, majorNameState } from '@/app/util/register/register';
import { codeAuth, emailAuth } from '../api/emailAuthAPI';
import { submitRegister } from '../api/registerAPI';

interface UserInfoContainerProps {
    showError?: boolean;
    registerCheck?: boolean;
    onNext: (isValid: boolean) => void;
}

const UserInfoContainer: React.FC<UserInfoContainerProps> = ({ showError = false, registerCheck = false, onNext }) => {
    const [name, setName] = useRecoilState(nameState);
    const [pw, setPw] = useState('');
    const [pw2, setPw2] = useState('');

    const [majorName] = useRecoilState(majorNameState);
    const [schoolEmail, setSchoolEmail] = useRecoilState(schoolEmailState);
    const [schoolName, setSchoolName] = useRecoilState(schoolNameState);
    const [studentNumber, setStudentNumber] = useRecoilState(studentNumberState);

    const [authCode, setAuthCode] = useState<number>(0);

    const [buttonLabel, setButtonLabel] = useState('이메일 인증하기');
    const [isMailSuccess, setIsMailSuccess] = useState(false);
    const [isMailCheckSuccess, setIsMailCheckSuccess] = useState(false);

    const nameRegex = /^[가-힣]{2,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
    const studentNumberRegex = /^[0-9]+$/;

    const handleEmailSubmission = async () => {
        if (!schoolName || !schoolEmail || !emailRegex.test(schoolEmail)) {
            console.error('유효한 학교명 또는 이메일이 필요합니다.');
            return;
        }

        try {
            const response = await emailAuth(schoolEmail, schoolName);
            if (response.ok) {
                setIsMailSuccess(true);
                setButtonLabel('인증 번호 입력 완료');
            } else {
                console.error('이메일 인증 실패');
            }
        } catch (error) {
            console.error('이메일 인증 중 에러 발생:', error);
        }
    };

    const handleAuthCodeSubmission = async () => {
        try {
            const response = await codeAuth(schoolEmail, schoolName, authCode);
            if (response.ok) {
                setIsMailSuccess(false);
                setIsMailCheckSuccess(true);
            } else {
                console.error('인증 실패');
                setIsMailCheckSuccess(false);
            }
        } catch (error) {
            console.error('인증 오류 발생:', error);
            setIsMailCheckSuccess(false);
        }
    };

    const validateForm = () => {
        return nameRegex.test(name) && emailRegex.test(schoolEmail) && passwordRegex.test(pw) && pw === pw2;
    };

    const handleNext = async () => {
        const isValid = validateForm();
        onNext(isValid);
        if (!isValid) return;

        try {
            const response = await submitRegister(studentNumber, schoolName, schoolEmail, pw, name, majorName);
            if (response.ok) {
                console.log('회원가입 성공');
            } else {
                console.error('회원가입 실패');
            }
        } catch (error) {
            console.error('회원가입 중 에러 발생:', error);
        }
    };

    return (
        <>
            <Title>사용자 정보 입력</Title>

            <Column>
                <SemiTitle>이름</SemiTitle>
                <Input
                    size='large'
                    placeholder='이름을 입력해주세요'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                {showError && !nameRegex.test(name) && (
                    <ErrorMessage>이름을 정확히 입력해주세요 (한글 2자 이상)</ErrorMessage>
                )}
            </Column>

            <Column>
                <SemiTitle>학번</SemiTitle>
                <Input
                    size='large'
                    placeholder='학번을 입력해주세요'
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                />
                {showError && !studentNumberRegex.test(studentNumber) && (
                    <ErrorMessage>학번을 정확히 입력해주세요</ErrorMessage>
                )}
            </Column>

            <Column>
                <SemiTitle>이메일</SemiTitle>
                <Input
                    size='large'
                    placeholder='example1234@gachon.ac.kr'
                    value={schoolEmail}
                    onChange={(e) => setSchoolEmail(e.target.value)}
                />
                {showError && !emailRegex.test(schoolEmail) && (
                    <ErrorMessage>유효한 이메일 주소를 입력해주세요</ErrorMessage>
                )}
            </Column>

            <Column>
                <SemiTitle>인증번호 입력</SemiTitle>
                <Input
                    size='large'
                    placeholder='인증번호 4자리를 입력해주세요'
                    value={authCode.toString()}
                    onChange={(e) => setAuthCode(Number(e.target.value))}
                />
            </Column>
            
            <Button onClick={isMailSuccess ? handleAuthCodeSubmission : handleEmailSubmission} size='large' label={buttonLabel} />
            {isMailCheckSuccess ? (
                <SuccessMessage>인증번호가 인증되었습니다</SuccessMessage>
            ) : (
                isMailSuccess && <SuccessMessage>인증번호가 발송되었습니다</SuccessMessage>
            )}
            {showError && !isMailCheckSuccess && <ErrorMessage>인증번호가 틀렸습니다.</ErrorMessage>}

            <Column>
                <SemiTitle>비밀번호</SemiTitle>
                <Input
                    type='password'
                    size='large'
                    placeholder='대문자,특수문자 포함 8~15자리'
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />
                {showError && !passwordRegex.test(pw) && (
                    <ErrorMessage>
                        대문자, 숫자, 특수문자를 포함한 8~15자리의 비밀번호를 입력해주세요
                    </ErrorMessage>
                )}
            </Column>

            <Column>
                <SemiTitle>비밀번호 확인</SemiTitle>
                <Input
                    type="password"
                    size='large'
                    placeholder='비밀번호를 한번 더 입력해주세요'
                    value={pw2}
                    onChange={(e) => setPw2(e.target.value)}
                />
                {showError && pw !== pw2 && (
                    <ErrorMessage>입력하신 비밀번호와 다릅니다</ErrorMessage>
                )}
            </Column>
            
            <Button $primary onClick={handleNext} size='large' label='회원가입 하기' />
        </>
    );
};

export default UserInfoContainer;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;
