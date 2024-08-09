import React from 'react';
import { ErrorMessage, SemiTitle, SuccessMessage, Title } from './Font';
import Select from '@/widgets/select/Select';
import Input from '@/widgets/input/Input';
import SearchIcon2 from '../../../../public/icons/searchIcon2.svg';
import styled from 'styled-components';
import Button from '@/widgets/button/Button';
import { useRecoilState } from 'recoil';
import { emailState, nameState, pwState, schoolEmailState } from '@/app/util/register/register';


interface UserInfoContainerProps {
    showError?: boolean;
    registerCheck?: boolean;
}

const UserInfoContainer: React.FC<UserInfoContainerProps> = ({ showError = false, registerCheck=false }) => {
    const [ name , setName ] = useRecoilState(nameState);
    const [ email , setMail ] = useRecoilState(emailState);
    const [ pw, setPw] = useRecoilState( pwState );
    const [ schoolEmail, setSchoolEmailState]  = useRecoilState(schoolEmailState);

    return (
        <>
            <Title>사용자 정보 입력</Title>   


            <Column>
            <SemiTitle>이름</SemiTitle>
            <Input size='large' placeholder='이름을 입력해주세요'/>
            {showError && !email && <ErrorMessage>이름을 입력해주세요</ErrorMessage>}
            </Column>

            <Column>
            <SemiTitle>이메일</SemiTitle>
            <Input size='large' placeholder='example1234@gachon.ac.kr'/>
            { {/** 특정 정규식 */} && <ErrorMessage>올바른 이메일을 입력해주세요</ErrorMessage>}
            {showError && !email && <ErrorMessage>이메일을 입력해주세요</ErrorMessage>}
            </Column>

            <Column>
            <SemiTitle>비밀번호</SemiTitle>
            <Input size='large' placeholder='대문자,특수문자 포함 8~15자리'/>
            { {/** 특정 정규식 */} && <ErrorMessage>올바른 비밀번호를 입력해주세요</ErrorMessage>}
            {showError && !email && <ErrorMessage>비밀번호를 입력해주세요</ErrorMessage>}
            </Column>

            <Column>
            <SemiTitle>비밀번호 확인</SemiTitle>
            <Input size='large' placeholder='비밀번호를 한번더 입력해주세요'/>
            { {/** 특정 정규식 */} && <ErrorMessage>입력하신 비밀번호와 다릅니다</ErrorMessage>}
            </Column>

            <Button  size='large' label='이메일 인증하기'/>
            { {/** 특정 정규식 */} && <SuccessMessage>인증번호가 발송되었습니다</SuccessMessage>}

            <Column>
            <SemiTitle>인증번호 입력</SemiTitle>
            <Input size='large' placeholder='인증번호 4자리를 입력해주세요'/>
            { {/** 특정 정규식 */} && <ErrorMessage>인증번호가 틀렸습니다.</ErrorMessage>}
            </Column>
        </>
    );
};

export default UserInfoContainer;

const Column = styled.div`
display : flex;
flex-direction : column;
gap: 0.5em;
`
