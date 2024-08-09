import React, { useEffect, useState } from 'react';
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import './payment.css';
import styled from 'styled-components';

interface TossPaymentAPIProps {}

const TossPaymentAPI: React.FC<TossPaymentAPIProps> = ({}) => {

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    const [payment, setPayment] = useState<any>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

    useEffect(() => {
        if (!clientKey) {
            console.error("TOSS_API_CLIENT_KEY is not defined");
            return;
        }

        const customerKey = generateRandomString();

        async function fetchPayment() {
            try {
                const tossPayments = await loadTossPayments(clientKey);

                // 회원 결제
                const payment = tossPayments.payment({
                    customerKey,
                });

                setPayment(payment);
            } catch (error) {
                console.error("Error fetching payment:", error);
            }
        }

        fetchPayment();
    }, [clientKey]);

    async function requestPayment() {
        if (!payment) {
            console.error("Payment object is not loaded");
            return;
        }

        const method = selectedPaymentMethod || "CARD";

        await payment.requestPayment({
            method,
            amount: {
                currency: "KRW",
                value: 50000,
            },
            orderId: generateRandomString(),
            orderName: "토스 티셔츠 외 2건",
            successUrl: window.location.origin + "/payment/success",
            failUrl: window.location.origin + "/fail",
            customerEmail: "customer123@gmail.com",
            customerName: "김토스",
            customerMobilePhone: "01012341234",
            card: {
                useEscrow: false,
                flowMode: "DEFAULT",
                useCardPoint: false,
                useAppCardOnly: false,
            }
        });
    }

    // clientKey가 없는 경우 null을 렌더링
    if (!clientKey) {
        return null;
    }

    return (
        <>
            <TossCheckOutButton onClick={requestPayment}>
                결제하기
            </TossCheckOutButton>
        </>
    );
};

export default TossPaymentAPI;

function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}

const TossCheckOutButton = styled.button`
    display : flex;
    justify-content : center;
    border-radius: 8px;
    cursor: pointer;
    background-color: #004E96;
    color: #000000;
    font-size: 0.875em;
    padding: 0.6875em;
    width : 100%;
    @media (max-width: 768px) {
        font-size: 0.5em;
    }
`;
