import apiClient from '@/shared/api/apiClient';

export const postAlarmConfirm = async (alarmId: number, email: string): Promise<any> => {
    try {
        const response = await apiClient.post(`alarm/${alarmId}`, {
            json: { email },
        });
        return await response.json();
    } catch (error) {
        console.error('알람 확인 API 호출 중 오류 발생:', error);
        throw error;
    }
};
