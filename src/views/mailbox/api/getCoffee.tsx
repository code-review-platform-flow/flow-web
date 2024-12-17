import apiClient from '@/shared/api/apiClient';
import { CoffechatListItem } from '../model/type';

interface CoffeeResponse {
    coffeeChat: CoffechatListItem[];
}

export const getCoffee = async (email: string): Promise<CoffechatListItem[]> => {
    try {
        const encodedEmail = encodeURIComponent(email);
        const response = await apiClient.get(`coffee/${encodedEmail}?size=100`);

        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data: CoffeeResponse = await response.json();

        if (!data.coffeeChat || !Array.isArray(data.coffeeChat)) {
            throw new Error('유효하지 않은 데이터 형식입니다.');
        }

        return data.coffeeChat;
    } catch (error) {
        console.error(`getCoffee Error :`, error);
        throw error;
    }
};
