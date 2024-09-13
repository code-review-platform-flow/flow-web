import React from 'react';
import styled from 'styled-components';

// RegisterButton 컴포넌트에 대한 인터페이스 정의
interface RegisterButtonProps {
    onClick: () => void; // onClick prop의 타입을 명시적으로 정의합니다.
}

// React Functional Component로 RegisterButton 정의
const RegisterButton: React.FC<RegisterButtonProps> = ({ onClick }) => {
    return <Styled onClick={onClick}>회원가입</Styled>;
};

export default RegisterButton;

// Styled 컴포넌트 정의
const Styled = styled.div`
    align-self: center;
    color: #737373;
    font-size: 0.8125em;
    text-decoration: underline;
    cursor: pointer; /* 마우스 오버 시 버튼처럼 보이도록 커서 스타일 설정 */
`;
