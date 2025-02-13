import Container from '@/widgets/container/Container';
import React from 'react';
import styled from 'styled-components';
import WriteIcon from '../../../../public/icons/writeIcon.svg';
import Image from 'next/image';
import Link from 'next/link';

const WriteContainer = ({ email }: { email?: string }) => {
    return (
        <>
            {email ? (
                <StyledLink href={'/post-write'}>
                    <StyledContainer size="wide" round>
                        <Image src={WriteIcon} alt="쓰기 아이콘" />
                        어떤 이야기를 나누고 싶나요?
                    </StyledContainer>
                </StyledLink>
            ) : (
                <StyledLink href={'/login'}>
                    <StyledContainer size="wide" round>
                        <Image src={WriteIcon} alt="쓰기 아이콘" />
                        로그인하고 플로우에 참여하세요!
                    </StyledContainer>
                </StyledLink>
            )}
        </>
    );
};

export default WriteContainer;

const StyledLink = styled(Link)`
    width: 100%;
`;

const StyledContainer = styled(Container)`
    display: flex;
    align-items: center;
    font-size: 0.8125em;
    color: #8e8e8e;
    justify-content: start;
    gap: 1em;
`;
