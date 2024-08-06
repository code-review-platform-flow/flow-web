import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import CrownIcon from '../../../../public/icons/crownIcon.svg';
import SilverMedalIcon from '../../../../public/icons/silverMedalIcon.svg';
import BronzeMedalIcon from '../../../../public/icons/bronzeMedalIcon.svg';
import Container from '@/widgets/container/Container';
import UserProfileImaeg from '../../../../public/images/profileImageExample.png';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';

interface HallOfFameUser {
    name: string;
    department: string;
    studentId: string;
    rank: number;
}

const hallOfFameList: HallOfFameUser[] = [
    { name: "홍길동", department: "컴퓨터공학과", studentId: "20180001", rank: 1 },
    { name: "김철수", department: "전자공학과", studentId: "20180002", rank: 2 },
    { name: "이영희", department: "기계공학과", studentId: "20180003", rank: 3 },
    { name: "박영수", department: "화학공학과", studentId: "20180004", rank: 4 },
    { name: "최지현", department: "건축학과", studentId: "20180005", rank: 5 },
    { name: "장미희", department: "산업공학과", studentId: "20180006", rank: 6 },
    { name: "윤지훈", department: "물리학과", studentId: "20180007", rank: 7 },
    { name: "한지민", department: "생명과학과", studentId: "20180008", rank: 8 },
    { name: "서지수", department: "수학과", studentId: "20180009", rank: 9 }
];

const RankIcon: React.FC<{ rank: number }> = ({ rank }) => {
    switch (rank) {
        case 1:
            return <IconWrapper><Image src={CrownIcon} alt='왕관' /></IconWrapper>
        case 2:
            return <IconWrapper><Image src={SilverMedalIcon} alt='은메달' /></IconWrapper>
        case 3:
            return <IconWrapper><Image src={BronzeMedalIcon} alt='동메달' /></IconWrapper>
        default:
            return null;
    }
};

const HallOfFameUserContainer: React.FC = () => {
    return (
        <GridWrapper>
            {hallOfFameList.map(user => (
                <UserContainer   width='200px' height='200px' key={user.studentId} >
                    {user.rank <= 3 && <RankIcon rank={user.rank} />}
                    <ColumnWrapper alignItems='center' gap='1em' >
                        <Image   
                            width={44}
                            height={44}
                            sizes="50vw" src={UserProfileImaeg} alt='프로필이미지'/>
                        {user.name} 
                        <RowWrapper justifyContent='center'>
                            <UserInfo>{user.department} {user.studentId}</UserInfo>
                        </RowWrapper>
                    </ColumnWrapper>
                </UserContainer>
            ))}
        </GridWrapper>
    );
};

export default HallOfFameUserContainer;

const GridWrapper = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-content : center center;
    gap :0.5em;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        padding-bottom : 1em;
    }

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        padding-bottom : 1em;
    }
`;

const UserContainer = styled(Container)`
    position : relative;
    display : flex;
    align-items : center;
    justify-cotent : center;
    
    @media(max-width : 768px){
        width : 100%;
    }
`;

const UserInfo = styled.div`
    color : #999999;
    font-size : 0.75em;
`;

const IconWrapper = styled.div`
    position : absolute;
    top : 0em;
`