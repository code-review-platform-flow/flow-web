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

    useEffect(() => {
        const fetchUserSummaries = async () => {
            const userIds = Array.from(
                new Set(
                    mailData.map((chat) => (selected === 'receiveBox' ? chat.initiatorUserId : chat.recipientUserId)),
                ),
            );

            const summaries: Record<number, UserSummary> = {};
            for (const userId of userIds) {
                try {
                    const userEmail =
                        mailData.find((chat) =>
                            selected === 'receiveBox'
                                ? chat.initiatorUserId === userId
                                : chat.recipientUserId === userId,
                        )?.recipientUserEmail || '';

                    if (userEmail) {
                        summaries[userId] = await getUserSummary(userEmail);
                    }
                } catch (error) {
                    console.error(`Error fetching user summary for userId ${userId}:`, error);
                }
            }

            setUserSummaries(summaries);
        };

        fetchUserSummaries();
    }, [mailData, selected]);

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
                        const userSummary = userSummaries[userId] || {
                            userName: '',
                            profileUrl: '',
                            majorName: '',
                        };

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
                                ? userSummaries[selectedChat.initiatorUserId]?.userName || '알 수 없음'
                                : mySummary!.userName
                        }
                        receiverName={
                            selected === 'receiveBox'
                                ? mySummary!.userName
                                : userSummaries[selectedChat.recipientUserId]?.userName || '알 수 없음'
                        }
                        senderImage={
                            selected === 'receiveBox'
                                ? userSummaries[selectedChat.initiatorUserId]?.profileUrl || ''
                                : mySummary!.profileUrl
                        }
                        receiverImage={
                            selected === 'sendBox'
                                ? userSummaries[selectedChat.recipientUserId]?.profileUrl || ''
                                : mySummary!.profileUrl
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
