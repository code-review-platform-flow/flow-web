'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import PaymentFail from './ui/PaymentFail';

const PaymentFailPage: React.FC = () => {
    return (
        <PageWrapper height="100%" marginTop="0">
            <PaymentFail />
        </PageWrapper>
    );
};

export default PaymentFailPage;
