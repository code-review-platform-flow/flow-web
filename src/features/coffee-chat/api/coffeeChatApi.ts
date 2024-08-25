import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import apiClient from '@/shared/api/apiClient';

interface CoffeeChatRequest {
    sender: string;
    receiver: string;
    contents: string;
}

interface CoffeeChatResponse {
    coffeeId: number;
}

const sendCoffeeChatRequest = async (chatData: CoffeeChatRequest): Promise<CoffeeChatResponse> => {
    return await apiClient.post('coffee', { json: chatData }).json<CoffeeChatResponse>();
};

export const useSendCoffeeChat = (options?: UseMutationOptions<CoffeeChatResponse, Error, CoffeeChatRequest>) => {
    return useMutation({
        mutationFn: sendCoffeeChatRequest,
        ...options,
    });
};
