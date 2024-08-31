import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import React from 'react';
import styled from 'styled-components';
import { Medium } from './Font';
import Container from '@/widgets/container/Container';
import Button from '@/widgets/button/Button';
import Image from 'next/image';
import ProfileImage2 from '../../../../public/images/profileImageExample2.png';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Link from 'next/link';

//커피챗 데이터
const coffechatData = [
    { rank: 1, profileImage: ProfileImage2, username: '사용자1' },
    { rank: 2, profileImage: ProfileImage2, username: '사용자2' },
    { rank: 3, profileImage: ProfileImage2, username: '사용자3' },
    { rank: 4, profileImage: ProfileImage2, username: '사용자4' },
    { rank: 5, profileImage: ProfileImage2, username: '사용자5' },
];

const CoffeChatList = () => {
    return (
        <ColumnWrapper gap="0.75em">
            <Medium>☕️ 커피챗 신청하기</Medium>
            <Container size="small" width="100%" height="100%">
                <ColumnWrapper gap="0.75em">
                    {coffechatData.map((item, index) => (
                        <UserInfo key={index}>
                            <StyledRowWrapper>
                                <Rank>{item.rank}</Rank>
                                <ProfileImage
                                    src={item.profileImage}
                                    alt={`Profile image of ${item.username}`}
                                    width={50}
                                    height={50}
                                />
                                <Username>{item.username}</Username>
                            </StyledRowWrapper>
                            <Link href={`/user/${index}`}>
                                <Button tertiary size="small" label="신청" />
                            </Link>
                        </UserInfo>
                    ))}
                </ColumnWrapper>
            </Container>
        </ColumnWrapper>
    );
};

export default CoffeChatList;

const StyledRowWrapper = styled(RowWrapper)`
    width: auto;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5em;
    width: 100%;
`;

const Rank = styled.div`
    font-size: 0.875em;
    color: #8e8e8e;
    width: 1em;
`;

const ProfileImage = styled(Image)`
    border-radius: 10px;
    margin-right: 0.5em;
    width: 2em;
    height: 2em;
`;

const Username = styled.div`
    font-size: 0.8125em;
`;
