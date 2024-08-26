import React, { useEffect, useState } from 'react';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import TossPaymentButton from './TossPaymentButton';

interface TossPaymentAPIProps {
    onClick?: () => void;
}

const TossPaymentAPI: React.FC<TossPaymentAPIProps> = ({ onClick }) => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const [payment, setPayment] = useState<any>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

    useEffect(() => {
        if (!clientKey) {
            console.error('Error: clientKey is not defined.');
            return;
        }

        const customerKey = generateRandomString();

        async function fetchPayment() {
            try {
                const tossPayments = await loadTossPayments(clientKey as string);

                if (!tossPayments) {
                    throw new Error('Failed to load Toss Payments SDK');
                }

                const payment = tossPayments.payment({
                    customerKey,
                });

                setPayment(payment);
            } catch (error) {
                console.error('Error fetching payment:', error);
            }
        }

        fetchPayment();
    }, [clientKey]);

    function generateRandomString() {
        return window.btoa(Math.random().toString()).slice(0, 20);
    }

    async function requestPayment() {
        if (onClick) {
            onClick();
        }

        if (!payment) {
            console.error('Error: Payment object is not loaded');
            return;
        }

        try {
            const method = selectedPaymentMethod || 'CARD';

            await payment.requestPayment({
                method,
                amount: {
                    currency: 'KRW',
                    value: 100,
                },
                orderId: generateRandomString(),
                orderName: '토스 티셔츠 외 2건',
                successUrl: `${serverUrl}/payment/success`,
                failUrl: `${serverUrl}/fail`,
                customerEmail: 'customer123@gmail.com',
                customerName: '김토스',
                customerMobilePhone: '01012341234',
                card: {
                    useEscrow: false,
                    flowMode: 'DEFAULT',
                    useCardPoint: false,
                    useAppCardOnly: false,
                },
            });
        } catch (error) {
            console.error('Error during payment request:', error);
        }
    }

    if (!clientKey) {
        return <p>Error: clientKey is not defined.</p>;
    }

    if (!payment) {
        return <p>Loading payment...</p>;
    }

    return <TossPaymentButton onClick={requestPayment} label="결제하기" />;
};

export default TossPaymentAPI;
