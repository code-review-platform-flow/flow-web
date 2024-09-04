import apiClient from '@/shared/api/apiClient';
import { EducationData } from '@/shared/type/user';

// 특정 유저의 특정 학력 정보를 가져오는 함수
export const getEducation = async (educationId: number): Promise<EducationData> => {
    try {
        const response = await apiClient.get(`user/education/${educationId}`);
        const data = (await response.json()) as EducationData; // 타입 단언 사용

        if (!data || typeof data !== 'object') {
            throw new Error('유저 학력 정보 데이터를 가져오는 중 오류가 발생했습니다.');
        }

        // API 응답을 EducationData 타입으로 강제 변환 (타입 검증)
        const educationData: EducationData = {
            enterYear: data.enterYear || '',
            quitYear: data.quitYear || '',
            univName: data.univName || '',
            department: data.department || '',
        };

        console.log('학력정보' + educationData);
        return educationData;
    } catch (error) {
        console.error(`getEducation Error:`, error);
        throw error;
    }
};
