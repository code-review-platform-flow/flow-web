'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import CoffeeChatSendContainer from '@/widgets/container/CoffeeChatSendContainer';

const CoffeeChatPage: React.FC = () => {
    return (
        <PageWrapper height="100%" marginTop="0">
            <CoffeeChatSendContainer />
        </PageWrapper>
    );
};

export default CoffeeChatPage;
