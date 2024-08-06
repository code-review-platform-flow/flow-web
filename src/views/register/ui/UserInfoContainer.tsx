import React from 'react';
import { SemiTitle, Title } from './Font';
import Select from '@/widgets/select/Select';
import Input from '@/widgets/input/Input';
import SearchIcon2 from '../../../../public/icons/searchIcon2.svg';
import styled from 'styled-components';
import Button from '@/widgets/button/Button';

const UserInfoContainer = () => {
    return (
        <>
            <Title>사용자 정보 입력</Title>   


            <Column>
            <SemiTitle>이름</SemiTitle>
            <Input size='large' placeholder='이름을 입력해주세요'/>
            </Column>

            <Column>
            <SemiTitle>이메일</SemiTitle>
            <Input size='large' placeholder='example1234@gachon.ac.kr'/>
            </Column>

            <Column>
            <SemiTitle>비밀번호</SemiTitle>
            <Input size='large' placeholder='대문자,특수문자 포함 8~15자리'/>
            </Column>

            <Column>
            <SemiTitle>비밀번호 확인</SemiTitle>
            <Input size='large' placeholder='비밀번호를 한번더 입력해주세요'/>
            </Column>

            <Button  size='large' label='이메일 인증하기'/>

            <Column>
            <SemiTitle>인증번호 입력</SemiTitle>
            <Input size='large' placeholder='인증번호 4자리를 입력해주세요'/>
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
