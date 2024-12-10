'use client';
import React, { ReactEventHandler } from 'react';
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
    return (
        <Container key={chat.coffeeId} round>
            <RowWrapper onClick={onClick} style={{ cursor: 'pointer' }} gap="1em">
                <ProfileImage
                    width={100}
                    height={100}
                    src={userSummary.profileUrl || '/images/profileImageExample.png'}
                    alt="profile"
                />
                <ColumnWrapper>
                    <SubTitle>
                        {selected === 'receiveBox'
                            ? `${userSummary.userName || '알 수 없음'}님이 커피챗을 요청했어요!`
                            : `${userSummary.userName || '알 수 없음'}에게 커피챗을 요청했어요!`}
                    </SubTitle>
                    <Part>{userSummary.majorName || '한줄 소개가 없습니다.'}</Part>
                    <RowWrapper>
                        <Time>{filterTime(chat.createDate)}</Time>
                        <State>대기중</State>
                    </RowWrapper>
                </ColumnWrapper>
            </RowWrapper>
        </Container>
    );
};

export default MailListItem;

// Styled Components
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

const State = styled.div`
    font-size: 0.875em;
    color: #004e96;
    background-color: #ebf1f7;
    padding: 0.25em;
    box-sizing: border-box;
    border-radius: 0.5em;
    margin-left: 0.5em;
`;

const ProfileImage = styled(Image)`
    width: 100%;
    height: auto;
    max-width: 80px;
    border-radius: 50%;
    margin-bottom: 1em;
`;
