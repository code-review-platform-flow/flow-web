import apiClient from '@/shared/api/apiClient';
import { CoffechatListItem } from '../model/type';

export const getCoffee = async (
    // page: number,
    // size: number,
    // sort: string,
    email: string,
): Promise<CoffechatListItem[]> => {
    try {
        const encodedEmail = encodeURIComponent(email);
        const response = await apiClient.get(`coffee/${encodedEmail}`);

        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        }

        const data: CoffechatListItem[] = await response.json();
        console.log('커피챗 정보:', data);
        return data;
    } catch (error) {
        console.error(`getCoffee Error :`, error);
        throw error;
    }
};
