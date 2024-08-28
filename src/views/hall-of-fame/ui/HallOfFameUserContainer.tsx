import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CrownIcon from '../../../../public/icons/crownIcon.svg';
import SilverMedalIcon from '../../../../public/icons/silverMedalIcon.svg';
import BronzeMedalIcon from '../../../../public/icons/bronzeMedalIcon.svg';
import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { useQuery } from '@tanstack/react-query';
import { fetchHallOfFameListDetail } from '../api/fetchHallOfFameList'; // fetch 함수를 별도 파일로 분리하여 임포트
import FlexWrapper from '@/widgets/wrapper/FlexWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';

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
        <FlexWrapper>
            <SizedBox height='1em'/>
            {hallOfFameList &&
                hallOfFameList.map((user, index) => (
                    <UserContainer key={index}>
                        {index + 1 <= 3 && <RankIcon rank={index + 1} />}
                        <ColumnWrapper alignItems="center" gap="1em">
                            <UserImage width={44} height={44} sizes="50vw" src={user.profileUrl} alt="프로필" />
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
        </FlexWrapper>
    );
};

export default HallOfFameUserContainer;


const UserContainer = styled(Container)`
    width : 31%;
    height: 200px;

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

const UserImage = styled(Image)`
    border-radius :10px;
`
