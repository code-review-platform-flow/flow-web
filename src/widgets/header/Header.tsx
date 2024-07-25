'use client'
import React from 'react';
import styled from 'styled-components';
import { Button } from '../button/Button';
import FlowLogo from '../../../public/logos/flowHeaderLogo.svg';
import searchIcon from '../../../public/icons/searchIcon.svg';
import Image from 'next/image';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <>
    <HeaderContainer>
      <Row>
        <LogoContainer>
          <Image src={FlowLogo} alt="Flow Logo" />
        </LogoContainer>
        <SearchContainer>
          <SearchIconWrapper>
            <Image src={searchIcon} alt='검색 아이콘' />
          </SearchIconWrapper>
          <SearchInput placeholder='플로우 검색하기' />
        </SearchContainer>
      </Row>
      <ButtonContainer>
        {user ? (
          <>
            <WelcomeText>
              환영합니다, <b>{user.name}</b>!
            </WelcomeText>
            <Button size="medium" onClick={onLogout} label="로그아웃" />
          </>
        ) : (
          <>
            <Button size="medium" onClick={onLogin} label="로그인" />
            <Button primary size="medium" onClick={onCreateAccount} label="회원가입" />
          </>
        )}
      </ButtonContainer>
    </HeaderContainer>
    <Margin />
  </>
);

export default Header;

const HeaderContainer = styled.header`
  position: fixed;
  z-index: 3;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1em 1.725em;
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 0px #eaeaec;
  background-color: #ffffff;
  backdrop-filter: blur(10px);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WelcomeText = styled.span`
  color: #333;
  font-size: 14px;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  button + button {
    margin-left: 10px;
  }
`;

const Margin = styled.div`
  width: 100%;
  height: 80px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  box-sizing : border-box;
  width: 100%;
  background-color: #f5f5f7;
  border: 0;
  border-radius: 0.625em;
  padding: 0.625em 0.625em 0.625em 2.5em;  
  &:focus {
    outline: none;
  }
`;

const SearchContainer = styled.div`
  margin-left : 1em;
  width: 100%;
  display: flex;
  position: relative;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1em;
  top: 60%;
  transform: translateY(-60%);
  pointer-events: none;
`;
