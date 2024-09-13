import React, { useEffect, useState, useCallback } from 'react';
import { loadTossPayments, TossPaymentsPayment } from '@tosspayments/tosspayments-sdk';
import TossPaymentButton from './TossPaymentButton';
import { useSendCoffeeChat } from '@/features/coffee-chat/api/coffeeChatApi';
import { useCreateOrder } from '@/features/order/api/orderApi';
import { useRecoilState } from 'recoil';
import { orderDataState } from '@/features/order/model/atoms';

interface TossPaymentAPIProps {
    sender: string;
    receiver: string;
    contents: string;
}
interface OrderData {
    orderId: number;
    customerKey: string;
    tossOrderId: string;
}

interface CardPaymentRequest {
    method: 'CARD'; // 결제 수단은 반드시 'CARD'여야 합니다.
    amount: {
        currency: 'KRW'; // 통화는 원화(KRW)로 고정됩니다.
        value: number; // 결제 금액입니다.
    };
    orderId: string; // 주문 ID를 나타내는 문자열입니다.
    orderName: string; // 주문 이름입니다.
    successUrl: string; // 결제 성공 시 리다이렉트될 URL입니다.
    failUrl: string; // 결제 실패 시 리다이렉트될 URL입니다.
    customerEmail?: string; // 구매자의 이메일 주소 (선택 사항).
    customerName?: string; // 구매자의 이름 (선택 사항).
    customerMobilePhone?: string; // 구매자의 휴대폰 번호 (선택 사항).
    card: {
        useEscrow?: boolean; // 에스크로 사용 여부 (선택 사항).
        flowMode?: 'DEFAULT' | 'DIRECT'; // 결제 흐름 모드 (기본 또는 직접).
        useCardPoint?: boolean; // 카드 포인트 사용 여부 (선택 사항).
        useAppCardOnly?: boolean; // 앱 카드만 사용할지 여부 (선택 사항).
    };
}

const TossPaymentAPI: React.FC<TossPaymentAPIProps> = ({ sender, receiver, contents }) => {
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
            requestPayment(data);
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
            sender,
            receiver,
            contents,
        });
    }, [sender, receiver, contents, sendCoffeeChat]);

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
                    customerEmail: sender,
                    customerName: '김토스',
                    customerMobilePhone: '01012341234',
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
