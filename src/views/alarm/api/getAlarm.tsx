import apiClient from '@/shared/api/apiClient';
import { AlarmListItem } from '../model/type';

export const getAlarm = async (email: string): Promise<AlarmListItem[]> => {
    try {
        const response = await apiClient.get(`alarm`, { searchParams: { email } });

        const data = (await response.json()) as { items: AlarmListItem[] };

        if (!data || !Array.isArray(data.items)) {
            throw new Error('유효하지 않은 데이터 형식입니다.');
        }

        return data.items;
    } catch (error) {
        console.error(`getAlarm Error:`, error);
        throw error;
    }
};
