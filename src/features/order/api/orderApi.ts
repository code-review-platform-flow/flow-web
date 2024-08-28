import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import apiClient from '@/shared/api/apiClient';

interface OrderRequest {
    coffeeId: number;
    totalAmount: number;
}

interface OrderResponse {
    orderId: number;
    customerKey: string;
    tossOrderId: string;
}

const createOrderRequest = async (orderData: OrderRequest): Promise<OrderResponse> => {
    console.log(`orderData : ${JSON.stringify(orderData)}`);
    return await apiClient.post('order', { json: orderData }).json<OrderResponse>();
};

export const useCreateOrder = (options?: UseMutationOptions<OrderResponse, Error, OrderRequest>) => {
    return useMutation({
        mutationFn: createOrderRequest,
        ...options,
    });
};
