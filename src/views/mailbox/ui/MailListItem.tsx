'use client';
import React, { ReactEventHandler, useState } from 'react';
import styled from 'styled-components';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import { CoffechatListItem } from '../model/type';
import filterTime from '@/shared/hook/filterTime';
import Container from '@/widgets/container/Container';

interface MailListItemProps {
    chat: CoffechatListItem;
    userSummary: {
        userName: string;
        profileUrl: string;
        majorName: string;
    };
    selected: 'receiveBox' | 'sendBox';
    onClick: () => void;
}

const MailListItem: React.FC<MailListItemProps> = ({ chat, userSummary, selected, onClick }) => {
    const [isAccepted, setIsAccepted] = useState(false);

    const handleStateClick = () => {
        setIsAccepted(true);
    };

    const safeUserSummary = userSummary || {
        userName: '알 수 없음',
        profileUrl: '/images/profileImageExample.png',
        majorName: '한줄 소개가 없습니다.',
    };

    return (
        <Container onClick={handleStateClick} key={chat.coffeeId} round>
            <RowWrapper onClick={onClick} style={{ cursor: 'pointer' }} gap="1em">
                <ProfileImage width={100} height={100} src={safeUserSummary.profileUrl} alt="profile" />
                <ColumnWrapper>
                    <SubTitle>
                        {selected === 'receiveBox'
                            ? `${safeUserSummary.userName}님이 커피챗을 요청했어요!`
                            : `${safeUserSummary.userName}에게 커피챗을 요청했어요!`}
                    </SubTitle>
                    <Part>{safeUserSummary.majorName}</Part>
                    <RowWrapper>
                        <Time>{filterTime(chat.createDate)}</Time>
                        <State accepted={isAccepted}>{isAccepted ? '수락 완료' : '대기중'}</State>
                    </RowWrapper>
                </ColumnWrapper>
            </RowWrapper>
        </Container>
    );
};

export default MailListItem;

const SubTitle = styled.div`
    font-size: 0.8125em;
    font-weight: 500;
    margin: 1em 0;
`;

const Part = styled.div`
    font-size: 1em;
    color: #707070;
    margin-bottom: 1em;
`;

const Time = styled.div`
    font-size: 0.875em;
    color: #707070;
`;

const State = styled.div<{ accepted: boolean }>`
    font-size: 0.875em;
    color: ${({ accepted }) => (accepted ? '#1E7E34' : '#004e96')};
    background-color: ${({ accepted }) => (accepted ? '#E0F3E4' : '#ebf1f7')};
    padding: 0.25em;
    box-sizing: border-box;
    border-radius: 0.5em;
    margin-left: 0.5em;
    cursor: pointer; // 클릭 가능하도록 설정
`;

const ProfileImage = styled(Image)`
    width: 100%;
    height: auto;
    max-width: 80px;
    border-radius: 50%;
    margin-bottom: 1em;
`;
