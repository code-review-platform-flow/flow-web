'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import CoffeeChatSendContainer from '@/widgets/container/CoffeeChatSendContainer';
import { useSearchParams } from 'next/navigation';
import { decodeBase64 } from '@/shared/hook/base64';
import { CoffeeChatState } from './model/typte';

const CoffeeChatPage: React.FC = () => {
    const searchParams = useSearchParams();
    const encodedData = searchParams.get('data');
    const chatState = encodedData ? decodeBase64<CoffeeChatState>(encodedData) : null;

    if (!chatState) {
        return <div>잘못된 접근입니다.</div>;
    }

    return (
        <PageWrapper height="100%" marginTop="0">
            <CoffeeChatSendContainer
                type="pay"
                senderName={chatState.sender.name}
                senderEmail={chatState.sender.email}
                receiverName={chatState.receiver.name}
                receiverEmail={chatState.receiver.email}
                senderImage={chatState.sender.photo}
                receiverImage={chatState.receiver.photo}
            />
        </PageWrapper>
    );
};

export default CoffeeChatPage;
