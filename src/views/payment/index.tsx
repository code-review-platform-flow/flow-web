'use client'
import React from 'react';
import { PaymentCheckoutPage } from './ui/PaymentCheckout'
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';


const PaymentPage: React.FC = ({  }) => {
    return (
        <PageWrapper>
            <PaymentCheckoutPage/>
        </PageWrapper>
    );
};

export default PaymentPage;