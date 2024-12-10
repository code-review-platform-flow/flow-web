import apiClient from '@/shared/api/apiClient';
import { EducationData } from '@/shared/type/user';

export const getEducation = async (educationId: number): Promise<EducationData> => {
    try {
        const response = await apiClient.get(`user/education/${educationId}`);
        const data = (await response.json()) as EducationData; // 타입 단언 사용

        if (!data || typeof data !== 'object') {
            throw new Error('유저 학력 정보 데이터를 가져오는 중 오류가 발생했습니다.');
        }

        const educationData: EducationData = {
            educationId: data.educationId,
            startDate: data.startDate || '',
            endDate: data.endDate || '',
            schoolName: data.schoolName || '',
        };

        return educationData;
    } catch (error) {
        console.error(`getEducation Error:`, error);
        throw error;
    }
};
