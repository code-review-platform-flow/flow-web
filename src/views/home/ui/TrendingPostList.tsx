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

// 명예의 전당 데이터
const hallOfFameData = [
    { rank: 1, profileImage: ProfileImage2, username: '사용자1', title: '백엔드 선배님들의 조언이 절실합니다.' },
    { rank: 2, profileImage: ProfileImage2, username: '사용자2', title: '생애 첫 학점 4.5 달성 팁' },
    {
        rank: 3,
        profileImage: ProfileImage2,
        username: '사용자3',
        title: '5년 전 첫 창업은 고객을 몰라서 망했다 하지만',
    },
];

const HallofFameList = () => {
    return (
        <ColumnWrapper gap="0.75em">
            <Medium>️🔥 트렌딩 포스트</Medium>
            <Container size="small" width="100%" height="100%">
                <ColumnWrapper gap="1.25em">
                    {hallOfFameData.map((item, index) => (
                        <UserInfo key={index}>
                            <Rank>{item.rank}</Rank>
                            <ColumnWrapper gap="0.25em">
                                <RowWrapper>
                                    <ProfileImage
                                        src={item.profileImage}
                                        alt={`Profile image of ${item.username}`}
                                        width={50}
                                        height={50}
                                    />
                                    <Username>{item.username}</Username>
                                </RowWrapper>
                                <PostTitle>{item.title}</PostTitle>
                            </ColumnWrapper>
                        </UserInfo>
                    ))}
                </ColumnWrapper>
                <Link href={'/trending-post'}>
                    <Button tertiary label="더보기" size="wide" />
                </Link>
            </Container>
        </ColumnWrapper>
    );
};

export default HallofFameList;

const UserInfo = styled.div`
    display: flex;
    align-items: start;
    margin-bottom: 0.5em;

    &:last-child {
        margin-bottom: 1.5em;
    }
`;

const Rank = styled.div`
    font-size: 0.875em;
    color: #8e8e8e;
    width: 1em;
`;

const ProfileImage = styled(Image)`
    border-radius: 100%;
    margin-right: 0.5em;
    width: 1.25em;
    height: 1.25em;
`;

const Username = styled.div`
    font-size: 0.8125em;
`;

const PostTitle = styled.div`
    font-size: 0.9375em;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 25ch;
`;
