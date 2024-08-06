'use client'
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import MailCategoryContainer from './ui/MailCategoryContainer';
import MailList from './ui/MailList';
import FlexWrapper from '../user/ui/FlexWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';

interface MailBoxPageProps {
}

const MailBoxPage: React.FC<MailBoxPageProps> = ({  }) => {
    return (
        <PageWrapper>
            <FlexWrapper>
                <MailCategoryContainer/>
                <SizedBox width="40%"/>
                <MailList/>
            </FlexWrapper>
        </PageWrapper>
    );
};

export default MailBoxPage;