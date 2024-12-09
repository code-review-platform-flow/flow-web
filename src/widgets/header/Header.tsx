'use client';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../button/Button';
import FlowLogo from '../../../public/logos/flowHeaderLogo.svg';
import searchIcon from '../../../public/icons/searchIcon.svg';
import pencilIcon from '../../../public/icons/pencilIcon.svg';
import modalPencilIcon from '../../../public/icons/modalPencilIcon.svg';

import bellIcon from '../../../public/icons/bellIcon.svg';
import boxIcon from '../../../public/icons/boxIcon.svg';
import hamburgerIcon from '../../../public/icons/hamburgerIcon.svg';
import profileIcon from '../../../public/icons/profileIcon.svg';
import logOutIcon from '../../../public/icons/logOutIcon.svg';
import profileExampleImage from '../../../public/images/profileImageExample.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Container from '../container/Container';
import { getUserSummary } from '@/shared/api/user/getUserSummary';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authDataState, userSummaryState } from '@/entities/auth/model';
import { UserSummary } from '@/shared/type/user';

type User = {
    email?: string;
};

export interface HeaderProps {
    user: User;
    onLogout: () => void;
    onCreateAccount?: () => void;
}

const Header = ({ user, onLogout, onCreateAccount }: HeaderProps) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [userSummary, setUserSummary] = useRecoilState(userSummaryState);
    const authData = useRecoilValue(authDataState);
    const email = authData?.email;
    const [searchTerm, setSearchTerm] = useState('');

    const clickModal = () => {
        setShowModal(!showModal);
    };
    const handleNavigation = () => {
        clickModal();

        const encodedEmail = Buffer.from(email!).toString('base64');
        router.push(`/user?email=${encodedEmail}`);
    };

    const handleNavigationMailBox = () => {
        router.push(`/mailbox`);
    };

    // 검색어 입력 시 처리 함수
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Enter 키 입력 시 검색 페이지로 이동하는 함수
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            if (searchTerm.trim()) {
                // 검색어가 비어있지 않으면 /search 페이지로 이동하며 쿼리 전달
                router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
            }
        }
    };

    const handleLogout = () => {
        onLogout();
        setShowModal(false);
    };

    useEffect(() => {
        if (email) {
            const fetchUserSummary = async () => {
                try {
                    const response = await getUserSummary(email);
                    setUserSummary(response);
                } catch (error) {
                    console.error('사용자 정보를 가져오는 중 오류 발생:', error);
                }
            };

            fetchUserSummary();
        }
    }, [email, setUserSummary]);

    return (
        <>
            <HeaderContainer>
                <Row>
                    <LogoContainer>
                        <StyledLogo
                            onClick={() => {
                                router.push('/');
                            }}
                            src={FlowLogo}
                            alt="Flow Logo"
                        />
                    </LogoContainer>
                    <SearchContainer>
                        <SearchIconWrapper>
                            <Image src={searchIcon} alt="검색 아이콘" />
                        </SearchIconWrapper>
                        <SearchInput
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="플로우 검색하기"
                        />
                    </SearchContainer>
                </Row>
                <ButtonContainer>
                    {showModal && (
                        <ModalWrapper border zIndex={100}>
                            <Row4>
                                <ProfileImage
                                    width={35}
                                    height={35}
                                    src={userSummary?.profileUrl || profileExampleImage}
                                    alt="프로필 이미지"
                                />
                                <Column>
                                    <UserName>{userSummary?.userName || '사용자 이름'}</UserName>
                                    <UserEmail>@{email || '사용자 이메일'}</UserEmail>
                                </Column>
                            </Row4>
                            <WritePostButton>
                                <Row
                                    onClick={() => {
                                        clickModal();
                                        router.push('/post-write');
                                    }}
                                >
                                    <ModalIcon src={modalPencilIcon} alt="글쓰기 아이콘" />새 포스트
                                </Row>
                                <Line />
                            </WritePostButton>
                            <MyProfileButton onClick={() => handleNavigation()}>
                                <ModalIcon src={profileIcon} alt="프로필 아이콘" />내 프로필
                            </MyProfileButton>
                            <LogOutButton onClick={handleLogout}>
                                <ModalIcon src={logOutIcon} alt="로그아웃 아이콘" />
                                로그아웃
                            </LogOutButton>
                        </ModalWrapper>
                    )}
                    {user?.email ? (
                        // 로그인시
                        <Row2>
                            <Row3>
                                <Icon src={boxIcon} alt="박스 아이콘" onClick={handleNavigationMailBox} />
                                <Icon src={bellIcon} alt="벨 아이콘" />
                                <HambergerIcon onClick={() => clickModal()} src={hamburgerIcon} alt="햄버거 아이콘" />
                            </Row3>
                            <ButtonWrapper>
                                <Link href="/post-write">
                                    <StyledButton tertiary size="medium" onClick={() => {}} label="새 포스트" />
                                </Link>
                                <PencilIconWrapper>
                                    <Image src={pencilIcon} alt="쓰기 아이콘" />
                                </PencilIconWrapper>
                                <ProfileImage
                                    width={35}
                                    height={35}
                                    onClick={() => clickModal()}
                                    src={userSummary?.profileUrl || profileExampleImage}
                                    alt="프로필 이미지"
                                />
                            </ButtonWrapper>
                        </Row2>
                    ) : (
                        // 로그아웃시
                        <>
                            <Link href="/login">
                                <Button size="medium" label="로그인" />
                            </Link>
                            <SizedBox />
                            <Link href="/register">
                                <Button $primary size="medium" onClick={onCreateAccount} label="회원가입" />
                            </Link>
                        </>
                    )}
                </ButtonContainer>
            </HeaderContainer>
        </>
    );
};

export default Header;

//모달 관련 css

const ModalWrapper = styled(Container)`
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    top: 60px;
    right: 10px;
    width: auto;
    gap: 1em;
`;
const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25em;
`;

const UserName = styled.div`
    font-size: 0.875em;
    font-weight: 600;
`;

const UserEmail = styled.div`
    font-size: 0.875em;
    font-weight: 400;
    color: #808080;
`;
const MyProfileButton = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.625em;
    color: #737373;
    gap: 0.5em;
    margin-left: 0.625em;
    cursor: pointer;
`;

const LogOutButton = styled(MyProfileButton)``;

const WritePostButton = styled(MyProfileButton)`
    display: none;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 0.625em;
        align-items: start;
        justify-content: center;
    }
`;

const Line = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: #c4c4c4;
`;
const StyledLogo = styled(Image)`
    cursor: pointer;
    @media (max-width: 768px) {
        width: 7em;
    }
`;

const SizedBox = styled.div`
    width: 0.5em;
`;

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
    width: 50%;
    display: flex;
    align-items: center;
    gap: 0.5em;

    @media (max-width: 768px) {
    }
`;

const Row4 = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5em;
`;

const Row2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Row3 = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        gap: 0.5em;
    }
`;

const SearchInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    background-color: #f5f5f7;
    border: 0;
    border-radius: 0.625em;
    padding: 0.625em 0.625em 0.625em 2.5em;
    margin-left: 0.875em;
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
    margin-left: 1em;
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
    position: relative;
    display: flex;

    @media (max-width: 768px) {
        display: none;
    }
`;

const PencilIconWrapper = styled.div`
    position: absolute;
    left: 0.5em;
    top: 70%;
    transform: translateY(-70%);

    @media (max-width: 768px) {
        position: static;
        transform: none;
        padding: 0.5em;
        border-radius: 0.625em;
        background-color: #e3f0fc;
    }
`;

const StyledButton = styled(Button)`
    padding: 0.625em 0.625em 0.625em 2.5em;

    @media (max-width: 768px) {
        display: none;
        width: 100%;
        padding: 0;
    }
`;

const Icon = styled(Image)`
    margin-right: 1em;
    cursor: pointer;
    @media (max-width: 768px) {
        margin-right: 0;
    }
`;

const ModalIcon = styled(Image)``;

const HambergerIcon = styled(Image)`
    display: none;
    cursor: pointer;
    @media (max-width: 768px) {
        display: block;
    }
`;

const ProfileImage = styled(Image)`
    margin-left: 0.5em;
    border-radius: 100%;
    cursor: pointer;

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;
