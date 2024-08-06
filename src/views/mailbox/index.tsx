'use client'
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import MailCategoryContainer from './ui/MailCategoryContainer';
import MailList from './ui/MailList';

interface MailBoxPageProps {
}

const MailBoxPage: React.FC<MailBoxPageProps> = ({  }) => {
    return (
        <PageWrapper>
            <MailCategoryContainer/>
            <MailList/>
        </PageWrapper>
    );
};

export default MailBoxPage;