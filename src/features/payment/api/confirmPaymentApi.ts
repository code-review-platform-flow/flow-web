import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import apiClient from '@/shared/api/apiClient';

interface ConfirmPaymentRequest {
    amount: number;
    paymentKey: string;
    tossOrderId: string;
}

const confirmPaymentRequest = async (paymentData: ConfirmPaymentRequest): Promise<void> => {
    console.log(`confirmPaymentRequest data: ${JSON.stringify(paymentData)}`);
    await apiClient.post('payment', { json: paymentData });
};

export const useConfirmPayment = (options?: UseMutationOptions<void, Error, ConfirmPaymentRequest>) => {
    return useMutation({
        mutationFn: confirmPaymentRequest,
        ...options,
    });
};
