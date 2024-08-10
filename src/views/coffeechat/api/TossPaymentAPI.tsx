import React, { useEffect, useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import "../ui/payment.css";
import styled from "styled-components";
import dynamic from "next/dynamic";

interface TossPaymentAPIProps {
  onClick?: () => void;
}

const TossPaymentAPI: React.FC<TossPaymentAPIProps> = ({ onClick }) => {
  const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [payment, setPayment] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  useEffect(() => {
    console.log(`process.env: ${JSON.stringify(process.env)}`);
    console.log(`clientKey : ${clientKey}`);

    if (!clientKey) {
      console.error("Error: clientKey is not defined.");
      return;
    }

    const customerKey = generateRandomString();

    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey as string);

        if (!tossPayments) {
          throw new Error("Failed to load Toss Payments SDK");
        }

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

  function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
  }

  async function requestPayment() {
    if (!payment) {
      console.error("Error: Payment object is not loaded");
      return;
    }

    try {
      const method = selectedPaymentMethod || "CARD";

      await payment.requestPayment({
        method,
        amount: {
          currency: "KRW",
          value: 100,
        },
        orderId: generateRandomString(),
        orderName: "토스 티셔츠 외 2건",
        successUrl: serverUrl + "/payment/success",
        failUrl: serverUrl + "/fail",
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });

      if (onClick) {
        onClick();
      }
    } catch (error) {
      console.error("Error during payment request:", error);
    }
  }

  if (!clientKey) {
    return <p>Error: clientKey is not defined.</p>;
  }

  return (
    <TossCheckOutButton onClick={requestPayment}>결제하기</TossCheckOutButton>
  );
};

export default dynamic(() => Promise.resolve(TossPaymentAPI), { ssr: false });

const TossCheckOutButton = styled.button`
  display: flex;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: #004e96;
  border: none;
  color: #ffffff;
  font-size: 0.875em;
  padding: 0.6875em;
  width: 100%;
  @media (max-width: 768px) {
    font-size: 0.5em;
  }
`;
