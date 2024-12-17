'use client';
import React, { useEffect, useState } from 'react';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import styled from 'styled-components';
import { CoffechatListItem } from '../model/type';
import { getUserSummary } from '@/shared/api/user/getUserSummary';
import { UserSummary } from '@/shared/type/user';
import MailListItem from './MailListItem';
import Modal from '@/widgets/modal/Modal';
import CoffeeChatSendContainer from '@/widgets/container/CoffeeChatSendContainer';
import { useRecoilValue } from 'recoil';
import { userSummaryState } from '@/entities/auth/model';

interface MailListProps {
    mailData: CoffechatListItem[];
    selected: 'receiveBox' | 'sendBox';
    email: string;
}

const MailList: React.FC<MailListProps> = ({ mailData, selected, email }) => {
    const [userSummaries, setUserSummaries] = useState<Record<number, UserSummary>>({});
    const mySummary = useRecoilValue(userSummaryState);
    const [selectedChat, setSelectedChat] = useState<CoffechatListItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 상대방의 데이터를 가져오는 함수
    const fetchUserSummaries = async () => {
        const userIds = Array.from(
            new Set(mailData.map((chat) => (selected === 'receiveBox' ? chat.initiatorUserId : chat.recipientUserId))),
        );

        const summaries: Record<number, UserSummary> = {};
        await Promise.all(
            userIds.map(async (userId) => {
                try {
                    const userEmail =
                        selected === 'receiveBox'
                            ? mailData.find((chat) => chat.initiatorUserId === userId)?.initiatorUserEmail
                            : mailData.find((chat) => chat.recipientUserId === userId)?.recipientUserEmail;

                    if (userEmail) {
                        summaries[userId] = await getUserSummary(userEmail);
                    }
                } catch (error) {
                    console.error(`Error fetching user summary for userId ${userId}:`, error);
                }
            }),
        );

        setUserSummaries(summaries);
    };

    // 마운트될 때 및 mailData, selected 값이 바뀔 때 사용자 정보 로드
    useEffect(() => {
        fetchUserSummaries();
    }, [mailData, selected]);

    // 받은 요청 또는 보낸 요청 데이터 필터링
    const filteredData = mailData.filter((chat) =>
        selected === 'receiveBox' ? chat.recipientUserEmail === email : chat.initiatorUserEmail === email,
    );

    const handleItemClick = (chat: CoffechatListItem) => {
        setSelectedChat(chat);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedChat(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <ColumnWrapper gap="1em">
                <Title>{selected === 'receiveBox' ? '받은 요청' : '보낸 요청'}</Title>
                {filteredData.length === 0 ? (
                    <NoDataMessage>
                        {selected === 'receiveBox' ? '받은 커피챗이 없습니다.' : '보낸 커피챗이 없습니다'}
                    </NoDataMessage>
                ) : (
                    filteredData.map((chat) => {
                        const userId = selected === 'receiveBox' ? chat.initiatorUserId : chat.recipientUserId;
                        const userSummary = userSummaries[userId];

                        return (
                            <MailListItem
                                onClick={() => handleItemClick(chat)}
                                key={chat.coffeeId}
                                chat={chat}
                                userSummary={userSummary}
                                selected={selected}
                            />
                        );
                    })
                )}
            </ColumnWrapper>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedChat && (
                    <CoffeeChatSendContainer
                        type={selected === 'receiveBox' ? 'received' : 'sent'}
                        senderName={
                            selected === 'receiveBox'
                                ? userSummaries[selectedChat.initiatorUserId]?.userName || '알 수 없음' // 상대방 이름
                                : mySummary?.userName || '알 수 없음' // 나의 이름
                        }
                        receiverName={
                            selected === 'receiveBox'
                                ? mySummary?.userName || '알 수 없음' // 나의 이름
                                : userSummaries[selectedChat.recipientUserId]?.userName || '알 수 없음' // 상대방 이름
                        }
                        senderImage={
                            selected === 'receiveBox'
                                ? userSummaries[selectedChat.initiatorUserId]?.profileUrl || ''
                                : mySummary?.profileUrl || ''
                        }
                        receiverImage={
                            selected === 'receiveBox'
                                ? mySummary?.profileUrl || ''
                                : userSummaries[selectedChat.recipientUserId]?.profileUrl || ''
                        }
                        senderEmail={selected === 'receiveBox' ? selectedChat.initiatorUserEmail : email}
                        receiverEmail={selected === 'receiveBox' ? email : selectedChat.recipientUserEmail}
                        contents={selectedChat.contents}
                    />
                )}
            </Modal>
        </>
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

const NoDataMessage = styled.div`
    font-size: 1em;
    color: #707070;
    text-align: center;
    margin-top: 2em;
`;
