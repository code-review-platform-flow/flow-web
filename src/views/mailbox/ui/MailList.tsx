'use client';
import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import React from 'react';
import styled from 'styled-components';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import { CoffechatListItem } from '../model/type';
import { useRecoilState } from 'recoil';
import { authDataState } from '@/entities/auth/model';

interface MailListProps {
    mailData: CoffechatListItem[]; // 외부에서 데이터 전달
    selected: 'receiveBox' | 'sendBox'; // 받은 요청 또는 보낸 요청
}

const MailList: React.FC<MailListProps> = ({ mailData, selected }) => {
    const authData = useRecoilState(authDataState);
    const filteredData = mailData.filter((chat) =>
        selected === 'receiveBox' ? chat.initiatorUserId === 5 : chat.recipientUserId === 5,
    );

    return (
        <ColumnWrapper gap="1em">
            <Title>{selected === 'receiveBox' ? '받은 요청' : '보낸 요청'}</Title>
            {filteredData.length === 0 ? (
                <NoDataMessage>
                    {selected === 'receiveBox' ? '받은 커피챗이 없습니다.' : '보낸 커피챗이 없습니다'}
                </NoDataMessage>
            ) : (
                filteredData.map((chat) => (
                    <Container key={chat.coffeeId} round>
                        <RowWrapper gap="1em">
                            <ProfileImage
                                width={100}
                                height={100}
                                // src={chat.imgUrl}
                                src="images/profileImageExample.png"
                                alt="profile"
                            />
                            <ColumnWrapper>
                                <SubTitle>
                                    {selected === 'receiveBox'
                                        ? `${chat.initiatorUserId}님이 커피챗을 요청했어요!`
                                        : `${chat.recipientUserId}에게 커피챗을 요청했어요!`}
                                </SubTitle>

                                {/* <Part>{chat.part}</Part> */}
                                <Part>프론트엔드 개발자입니다.</Part>
                                <RowWrapper>
                                    {/* <Time>{chat.date}일 전</Time> */}
                                    <Time>3일 전</Time>
                                    <State>대기중</State>
                                </RowWrapper>
                            </ColumnWrapper>
                        </RowWrapper>
                    </Container>
                ))
            )}
        </ColumnWrapper>
    );
};

export default MailList;

const Title = styled.div`
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 1em;
    @media (max-width: 768px) {
        font-size: 1.25em;
    }
`;

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

const NoDataMessage = styled.div`
    font-size: 1em;
    color: #707070;
    text-align: center;
    margin-top: 2em;
`;
