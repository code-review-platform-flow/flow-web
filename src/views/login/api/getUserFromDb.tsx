import apiClient from '@/shared/api/apiClient';
import { CoffechatListItem } from '@/views/mailbox/model/type';

export const getCoffee = async (
    page: number,
    size: number,
    sort: string,
    email: string | undefined,
): Promise<CoffechatListItem[]> => {
    try {
        const response = await apiClient.get(`/coffee?page=${page}&size=${size}&sort=${sort}&email=${email}`);

        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }

        return await response.json();
    } catch (error) {
        console.error('getCoffee Error:', error);
        throw error;
    }
};
