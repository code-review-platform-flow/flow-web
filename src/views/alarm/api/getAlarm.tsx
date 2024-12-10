import apiClient from '@/shared/api/apiClient';
import { AlarmListItem } from '../model/type';

interface AlarmResponse {
    coffeeChat: AlarmListItem[];
}

export const getAlarm = async (email: string): Promise<AlarmListItem[]> => {
    try {
        const encodedEmail = encodeURIComponent(email);
        const response = await apiClient.get(`alarm/${encodedEmail}`);

        if (!response.ok) {
            throw new Error('알람을 가져오는 중 오류가 발생했습니다.');
        }
        const data: AlarmResponse = await response.json();

        if (!Array.isArray(data)) {
            throw new Error('유효하지 않은 데이터 형식입니다.');
        }

        return data;
    } catch (error) {
        console.error(`getAlarm Error :`, error);
        throw error;
    }
};
