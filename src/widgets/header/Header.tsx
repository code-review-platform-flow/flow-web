'use client'
import React from 'react';
import styled from 'styled-components';
import { Button } from '../button/Button';
import FlowLogo from '../../../public/logos/flowHeaderLogo.svg';
import searchIcon from '../../../public/icons/searchIcon.svg';
import pencilIcon from '../../../public/icons/pencilIcon.svg';
import bellIcon from '../../../public/icons/bellIcon.svg';
import boxIcon from '../../../public/icons/boxIcon.svg';
import profileExampleImage from '../../../public/images/profileImageExample.png';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

type User = {
  name: string;
};

export interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => {
  const router = useRouter();

  return (
    <>
      <HeaderContainer>
        <Row>
          <LogoContainer>
            <StyledLogo onClick={()=>router.push('/')} src={FlowLogo} alt="Flow Logo" />
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
            // 로그인시
            <Row2>
              <Icon src={boxIcon} alt='박스 아이콘'/>
              <Icon src={bellIcon} alt='벨 아이콘'/>
              <ButtonWrapper>
                <StyledButton tertiary size="medium" onClick={onCreateAccount} label="새 포스트" />
                <PencilIconWrapper>
                  <Image src={pencilIcon} alt='쓰기 아이콘'/>
                </PencilIconWrapper>
                <ProfileImage src={profileExampleImage} alt='프로필 이미지'/>
              </ButtonWrapper>
            </Row2>
          ) : (
            // 로그아웃시
            <>
              <Link href="/login"><Button size="medium" onClick={onLogin} label="로그인"/></Link>
              <SizedBox/>
              <Link href="/register"><Button $primary size="medium" onClick={onCreateAccount} label="회원가입" /></Link>
            </>
          )}
        </ButtonContainer>
      </HeaderContainer>
    </>
  );
};

export default Header;

const StyledLogo = styled(Image)`
  @media (max-width: 768px) {
    width : 7em;
  }
`;

const SizedBox = styled.div`
  width : 0.5em;
`

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
  @media (max-width: 768px) {
    padding: 0.5em 0.725em;
  }
    
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  button + button {
    margin-left: 10px;
  }
`;

const Row = styled.div`
  width : 50%;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
  }
`;

const Row2 = styled.div`
  display : flex;
  align-items : center;
`;

const SearchInput = styled.input`
  box-sizing : border-box;
  width: 100%;
  background-color: #f5f5f7;
  border: 0;
  border-radius: 0.625em;
  padding: 0.625em 0.625em 0.625em 2.5em;  
  margin-left :0.8750em;
  &:focus {
    outline: none;
  }
  @media (max-width: 768px) {
    margin-left: 0;
    padding-left: 2.5em;
    width: 100%;
    &::placeholder {
      color: transparent;
    }
  }
`;

const SearchContainer = styled.div`
  margin-left : 1em;
  width: 100%;
  display: flex;
  position: relative;

  @media (max-width: 768px) {
    margin-left: 1em;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1.5em;
  top: 60%;
  transform: translateY(-60%);
  pointer-events: none;
`;

const ButtonWrapper = styled.div`
  position : relative;
  display : flex;
`;

const PencilIconWrapper = styled.div`
  position : absolute;
  left: 0.5em;
  top: 70%;
  transform: translateY(-70%);

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
    transform: none;
    margin-top: 0.5em;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.625em 0.625em 0.625em 2.5em;  

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Icon = styled(Image)`
  margin-right : 1em;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 0.5em;
  }
`;

const ProfileImage = styled(Image)`
  margin-left : 0.5em;
  width : 35px;
  height : 35px;
  border-radius : 100%;

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 0.5em;
  }
`;
