'use client';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useConfirmPayment } from '@/features/payment/api/confirmPaymentApi';
import Link from 'next/link';
import './payment.css';

const PaymentSuccess = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const confirmPaymentMutation = useConfirmPayment({
        onSuccess: (data) => {},
        onError: (error: any) => {
            if (error.code) {
                router.push(`/payment/fail?code=${error.code}&message=${error.message}`);
            } else {
                router.push(`/payment/fail?message=${error.message}`);
            }
        },
    });

    useEffect(() => {
        if (!searchParams) return;  // searchParams가 null인지 확인

        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');
        const paymentKey = searchParams.get('paymentKey');

        if (orderId && amount && paymentKey) {
            confirmPaymentMutation.mutate({
                tossOrderId: orderId,
                amount: Number(amount),
                paymentKey,
            });
        }
    }, [searchParams]); 

    return (
        <div className="box_section" style={{ width: '600px' }}>
            <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" alt="결제 완료" />
            <h2>결제를 완료했어요</h2>
            <div className="p-grid typography--p" style={{ marginTop: '50px' }}>
                <div className="">
                    <b>결제금액</b>
                </div>
                <div className="p-grid-col text--right" id="amount">
                    {searchParams ? `${Number(searchParams.get('amount')).toLocaleString()}원`: ''}
                </div>
            </div>
            <div className="p-grid typography--p" style={{ marginTop: '10px' }}>
                <div className="p-grid-col text--left">
                    <b>주문번호</b>
                </div>
                <div className="p-grid-col text--right" id="orderId">
                    {searchParams ? `${searchParams.get('orderId')}` : ""}
                </div>
            </div>
            <div className="p-grid typography--p" style={{ marginTop: '10px' }}>
                <div className="p-grid-col text--left">
                    <b>paymentKey</b>
                </div>
                <div
                    className="p-grid-col text--right"
                    id="paymentKey"
                    style={{ whiteSpace: 'initial', width: '250px' }}
                >
                    {searchParams ? `${searchParams.get('paymentKey')}` : ""} 
                </div>
            </div>
            <div className="p-grid-col">
                <Link href="/">
                    <button className="button p-grid-col5">홈으로</button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
