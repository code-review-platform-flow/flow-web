import React, { useEffect, useState, useCallback } from 'react';
import { loadTossPayments, TossPaymentsPayment } from '@tosspayments/tosspayments-sdk';
import TossPaymentButton from './TossPaymentButton';
import { useSendCoffeeChat } from '../api/coffeeChatApi';
import { useCreateOrder } from '@/features/order/api/orderApi';
import { useRecoilState } from 'recoil';
import { orderDataState } from '@/entities/order/model/atoms';
import { contentState } from '@/views/post-write/model/postAtoms';

interface TossPaymentAPIProps {
    contents: string;
    sender: string;
    receiver: string;
}

interface OrderData {
    orderId: number;
    customerKey: string;
    tossOrderId: string;
}

interface CardPaymentRequest {
    method: 'CARD';
    amount: {
        currency: 'KRW';
        value: number;
    };
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail?: string;
    customerName?: string;
    customerMobilePhone?: string;
    card: {
        useEscrow?: boolean;
        flowMode?: 'DEFAULT' | 'DIRECT';
        useCardPoint?: boolean;
        useAppCardOnly?: boolean;
    };
}

const TossPaymentAPI: React.FC<TossPaymentAPIProps> = ({ contents, sender, receiver }) => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string;
    console.log(clientKey);
    const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL as string;

    const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
    const [selectedPaymentMethod] = useState<string>('CARD');
    const [orderData, setOrderData] = useRecoilState<OrderData | null>(orderDataState);
    // Error Handling
    const handleError = useCallback((error: any) => {
        console.error('Error:', error);
        alert('문제가 발생했습니다. 다시 시도해주세요.');
    }, []);

    // React Query Hooks
    const { mutate: sendCoffeeChat } = useSendCoffeeChat({
        onSuccess: (data) => handleOrderCreation(data.coffeeId),
        onError: handleError,
    });

    const { mutate: createOrder } = useCreateOrder({
        onSuccess: (data) => handlePaymentRequest(data),
        onError: handleError,
    });

    // Payment Initialization
    const initializePayment = useCallback(async () => {
        if (!clientKey) return handleError('Toss Payments Client Key is missing.');

        try {
            const tossPayments = await loadTossPayments(clientKey);
            if (!tossPayments) throw new Error('Failed to load Toss Payments SDK');

            setPayment(tossPayments.payment({ customerKey: generateRandomString() }));
        } catch (error) {
            handleError(error);
        }
    }, [clientKey, handleError]);

    const generateRandomString = (): string => window.btoa(Math.random().toString()).slice(0, 20);

    // Request Payment
    const requestPayment = async (order: OrderData): Promise<void> => {
        if (!payment) {
            console.error('Error: Payment object is not loaded');
            return;
        }

        try {
            if (selectedPaymentMethod === 'CARD') {
                const cardPaymentRequest: CardPaymentRequest = {
                    method: 'CARD',
                    amount: {
                        currency: 'KRW',
                        value: 2000,
                    },
                    orderId: order.tossOrderId,
                    orderName: '커피챗 결제',
                    successUrl: `http://34.64.192.252/payment/success`,
                    failUrl: `http://34.64.192.252/payment/fail`,
                    customerEmail: 'customer123@gmail.com',
                    customerName: '김토스',
                    customerMobilePhone: '01012341234',
                    card: {
                        useEscrow: false,
                        flowMode: 'DEFAULT',
                        useCardPoint: false,
                        useAppCardOnly: false,
                    },
                };

                await payment.requestPayment(cardPaymentRequest).catch((error) => {
                    if (error.code === 'USER_CANCEL') {
                        console.log('사용자가 결제 창을 닫았습니다.');
                    } else {
                        console.error('결제 요청 중 에러:', error);
                        alert('결제 도중 문제가 발생했습니다. 다시 시도해주세요.');
                    }
                });
            } else {
                console.error('Unsupported payment method');
            }
        } catch (error) {
            console.error('Error during payment request:', error);
        }
    };

    // Send Coffee Chat
    const handleSendCoffeeChat = (): void => {
        if (!sender || !receiver || !contentState) {
            return handleError('Sender, Receiver, or Content is missing.');
        }
        sendCoffeeChat({ sender, receiver, contents });
    };

    const handleOrderCreation = (coffeeId: number): void => {
        createOrder({ coffeeId, totalAmount: 2000 });
    };

    const handlePaymentRequest = (data: OrderData): void => {
        setOrderData(data);
        requestPayment(data);
    };

    useEffect(() => {
        initializePayment();
    }, [initializePayment]);

    if (!clientKey) {
        return <p>결제에 필요한 설정이 누락되었습니다. 관리자에게 문의하세요.</p>;
    }

    if (!payment) {
        return <p>결제 환경을 준비 중입니다...</p>;
    }

    return <TossPaymentButton onClick={handleSendCoffeeChat} label="결제하기" />;
};

export default TossPaymentAPI;
