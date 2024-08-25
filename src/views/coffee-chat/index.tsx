'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import CoffeeChatContainer from './ui/CoffeeChatSendContainer';

const PostWritePage: React.FC = () => {
    return (
        <PageWrapper height="100%" marginTop="0">
            <CoffeeChatContainer />
        </PageWrapper>
    );
};

export default PostWritePage;
