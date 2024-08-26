import React, { useEffect, useState, useCallback } from 'react';
import { loadTossPayments, TossPaymentsPayment, CardPaymentRequest } from '@tosspayments/tosspayments-sdk';
import TossPaymentButton from './TossPaymentButton';
import { useSendCoffeeChat } from '@/features/coffee-chat/api/coffeeChatApi';
import { useCreateOrder } from '@/features/order/api/orderApi';
import { useRecoilState } from 'recoil';
import { orderDataState } from '@/entities/order/model/atoms';

interface TossPaymentAPIProps {
    contents: string;
}

interface OrderData {
    orderId: number;
    customerKey: string;
    tossOrderId: string;
}

const TossPaymentAPI: React.FC<TossPaymentAPIProps> = ({ contents }) => {
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string;
    const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL as string;

    const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('CARD');
    const [orderData, setOrderData] = useRecoilState<OrderData | null>(orderDataState);

    // Use React Query mutation hooks
    const { mutate: sendCoffeeChat } = useSendCoffeeChat({
        onSuccess: (data: { coffeeId: number }) => {
            console.log('Coffee chat sent successfully:', data);
            createOrder({ coffeeId: data.coffeeId, totalAmount: 2000 });
        },
        onError: (error: any) => {
            console.error('Error sending coffee chat:', error);
        },
    });

    const { mutate: createOrder } = useCreateOrder({
        onSuccess: (data: OrderData) => {
            console.log('Order created successfully:', data);
            setOrderData(data);
            // requestPayment(data);
        },
        onError: (error: any) => {
            console.error('Error creating order:', error);
        },
    });

    const initializePayment = useCallback(async () => {
        if (!clientKey) {
            console.error('Error: clientKey is not defined.');
            return;
        }

        try {
            const tossPayments = await loadTossPayments(clientKey);
            if (!tossPayments) {
                throw new Error('Failed to load Toss Payments SDK');
            }

            const paymentInstance = tossPayments.payment({
                customerKey: generateRandomString(),
            });

            setPayment(paymentInstance);
        } catch (error) {
            console.error('Error fetching payment:', error);
        }
    }, [clientKey]);

    const generateRandomString = useCallback((): string => {
        return window.btoa(Math.random().toString()).slice(0, 20);
    }, []);

    const handleSendCoffeeChat = useCallback((): void => {
        sendCoffeeChat({
            sender: 'a1061602@gmail.com',
            receiver: 'iamjms4237@gachon.ac.kr',
            contents,
        });
    }, [contents, sendCoffeeChat]);

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
                    successUrl: `${clientUrl}/payment/success`,
                    failUrl: `${clientUrl}/fail`,
                    customerEmail: 'customer123@gmail.com',
                    customerName: '김토스',
                    customerMobilePhone: '01012341234',
                    customerKey: order.customerKey,
                    card: {
                        useEscrow: false,
                        flowMode: 'DEFAULT',
                        useCardPoint: false,
                        useAppCardOnly: false,
                    },
                };

                await payment.requestPayment(cardPaymentRequest);
            } else {
                console.error('Unsupported payment method');
            }
        } catch (error) {
            console.error('Error during payment request:', error);
        }
    };

    useEffect(() => {
        initializePayment();
    }, [initializePayment]);

    if (!clientKey) {
        return <p>Error: clientKey is not defined.</p>;
    }

    if (!payment) {
        return <p>Loading payment...</p>;
    }

    return <TossPaymentButton onClick={handleSendCoffeeChat} label="결제하기" />;
};

export default TossPaymentAPI;
