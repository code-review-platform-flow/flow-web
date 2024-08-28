'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React from 'react';
import PaymentSuccess from '@/entities/payment/ui/PaymentSuccess';

const PaymentSuccessPage: React.FC = () => {
    return (
        <PageWrapper height="100%" marginTop="0">
            <PaymentSuccess />
        </PageWrapper>
    );
};

export default PaymentSuccessPage;
