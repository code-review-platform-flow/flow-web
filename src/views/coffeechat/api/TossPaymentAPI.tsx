import React, { useEffect, useState } from 'react';
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import '../ui/payment.css';
import styled from 'styled-components';
import dynamic from 'next/dynamic'

interface TossPaymentAPIProps {
    onClick?: ()=> void;
}

const TossPaymentAPI: React.FC<TossPaymentAPIProps> = ({onClick}) => {

    // ------  SDK 초기화 ------
    // TODO: clientKey는 개발자센터의 API 개별 연동 키 > 결제창 연동에 사용하려할 MID > 클라이언트 키로 바꾸세요.
    // TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
    // TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
    // @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    const [payment, setPayment] = useState<any>(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    
    function generateRandomString() {
        return window.btoa(Math.random().toString()).slice(0, 20);
    }

    useEffect(() => {

            if (!clientKey) {
                console.error("NEXT_PUBLIC_TOSS_CLIENT_KEY is not defined");
                return;
            }

            const customerKey = generateRandomString();

            async function fetchPayment() {
                try {
                    const tossPayments = await loadTossPayments(clientKey as string);

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

    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
    async function requestPayment() {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
        if (!payment) {
            console.error("Payment object is not loaded");
            return;
        }

        const method = selectedPaymentMethod || "CARD";

        await payment.requestPayment({
            method,
            amount: {
                currency: "KRW",
                value: 100,
            },
            orderId: generateRandomString(), // 고유 주문번호
            orderName: "토스 티셔츠 외 2건",
            successUrl: process.env.NEXT_PUBLIC_SERVER_URL + "/payment/success", // 결제 요청이 성공하면 리다이렉트되는 URL
            failUrl: process.env.NEXT_PUBLIC_SERVER_URL + "/fail", // 결제 요청이 실패하면 리다이렉트되는 URL
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

        // onClick 함수가 존재하면 호출
        if (onClick) {
            onClick();
        }
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

export default dynamic(() => Promise.resolve(TossPaymentAPI), {
    ssr: false
})



const TossCheckOutButton = styled.button`
    display : flex;
    justify-content : center;
    border-radius: 8px;
    cursor: pointer;
    background-color: #004E96;
    border : none;
    color: #FFFFFF;
    font-size: 0.875em;
    padding: 0.6875em;
    width : 100%;
    @media (max-width: 768px) {
        font-size: 0.5em;
    }
`;
