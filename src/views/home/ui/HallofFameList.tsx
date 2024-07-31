import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import React from 'react';
import styled from 'styled-components';
import { Medium } from './Font';
import Container from '@/widgets/container/Container';
import Button from '@/widgets/button/Button';
import Image from 'next/image';
import ProfileImage2 from '../../../../public/images/profileImageExample2.png';

// 명예의 전당 데이터
const hallOfFameData = [
    { rank: 1, profileImage: ProfileImage2, username: '사용자1' },
    { rank: 2, profileImage: ProfileImage2, username: '사용자2' },
    { rank: 3, profileImage: ProfileImage2, username: '사용자3' },
    { rank: 4, profileImage: ProfileImage2, username: '사용자4' },
];

const HallofFameList = () => {
    return (
        <ColumnWrapper gap='0.75em'>
            <Medium>🏆 명예의 전당</Medium>
            <Container size='small' width='100%'>
            <ColumnWrapper gap='0.75em'>
                {hallOfFameData.map((item, index) => (
                
                    <UserInfo key={index}>
                        <Rank>{item.rank}</Rank>
                        <ProfileImage src={item.profileImage} alt={`Profile image of ${item.username}`} width={50} height={50} />
                        <Username>{item.username}</Username>
                    </UserInfo>
                
                ))}
            </ColumnWrapper>
                <Button tertiary label='더보기' size='wide' />
            </Container>
        </ColumnWrapper>
    );
};

export default HallofFameList;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;

    &:last-child {
        margin-bottom: 1.5em; 
    }
`;

const Rank = styled.div`
    font-size: 0.875em;
    color : #8E8E8E;
    width : 1em;
`;

const ProfileImage = styled(Image)`
    border-radius: 10px;
    margin-right: 0.5em;
    width : 2em;
    height : 2em;
`;

const Username = styled.div`
    font-size: 0.8125em;
`;
