import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CrownIcon from '../../../../public/icons/crownIcon.svg';
import SilverMedalIcon from '../../../../public/icons/silverMedalIcon.svg';
import BronzeMedalIcon from '../../../../public/icons/bronzeMedalIcon.svg';
import Container from '@/widgets/container/Container';
import UserProfileImage from '../../../../public/images/profileImageExample.png';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { useQuery } from '@tanstack/react-query';
import { fetchHallOfFameListDetail } from '../api/fetchHallOfFameList'; // fetch 함수를 별도 파일로 분리하여 임포트

export interface HallOfFameUser {
    name: string;
    department: string;
    studentId: string;
    rank: number;
    email: string;
}

const RankIcon: React.FC<{ rank: number }> = ({ rank }) => {
    switch (rank) {
        case 1:
            return (
                <IconWrapper>
                    <StyledImage src={CrownIcon} alt="왕관" />
                </IconWrapper>
            );
        case 2:
            return (
                <IconWrapper>
                    <StyledImage src={SilverMedalIcon} alt="은메달" />
                </IconWrapper>
            );
        case 3:
            return (
                <IconWrapper>
                    <StyledImage src={BronzeMedalIcon} alt="동메달" />
                </IconWrapper>
            );
        default:
            return null;
    }
};

const HallOfFameUserContainer: React.FC = () => {
    const {
        data: hallOfFameList = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['hallOfFameListDetail'],
        queryFn: () => fetchHallOfFameListDetail(),
    });
    console.log(hallOfFameList);
    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.log(error);
        return <div>오류가 발생했습니다.</div>;
    }

    return (
        <GridWrapper>
            {hallOfFameList &&
                hallOfFameList.map((user, index) => (
                    <UserContainer width="200px" height="200px" key={index}>
                        {index + 1 <= 3 && <RankIcon rank={index + 1} />}
                        <ColumnWrapper alignItems="center" gap="1em">
                            <Image width={44} height={44} sizes="50vw" src={UserProfileImage} alt="프로필" />
                            {user.userName}
                            <RowWrapper justifyContent="center">
                                <UserInfo>
                                    {user.majorName}{' '}
                                    {user.studentNumber ? `${user.studentNumber.substring(0, 2)}학번` : ''}
                                </UserInfo>
                            </RowWrapper>
                        </ColumnWrapper>
                    </UserContainer>
                ))}
        </GridWrapper>
    );
};

export default HallOfFameUserContainer;

// 스타일 컴포넌트는 그대로 유지합니다.
const GridWrapper = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content: center center;
    gap: 0.5em;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        padding-bottom: 1em;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        padding-bottom: 1em;
    }
`;

const UserContainer = styled(Container)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const UserInfo = styled.div`
    color: #999999;
    font-size: 0.75em;
`;

const IconWrapper = styled.div`
    position: absolute;
    top: 0em;
    left: 1em;
`;

const StyledImage = styled(Image)`
    width: 3em;
    height: 3em;
    @media (max-width: 768px) {
        width: 2em;
        height: 2em;
    }
`;
