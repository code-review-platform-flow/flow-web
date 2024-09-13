import apiClient from '@/shared/api/apiClient';
import { CareerData } from '@/shared/type/user';

// 특정 유저의 특정 이력을 가져오는 함수
export const getCareer = async (careerId: number): Promise<CareerData> => {
    try {
        console.log('이력 정보:', careerId);
        const response = await apiClient.get(`user/career/${careerId}`);

        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.status} - ${response.statusText}`);
        }

        const data: any = await response.json();

        if (!data || typeof data !== 'object') {
            throw new Error('유저 이력 정보 데이터를 가져오는 중 오류가 발생했습니다.');
        }

        // API 응답을 CareerData 타입으로 강제 변환 (타입 검증)
        const careerData: CareerData = {
            careerId: data.careerId,
            title: data.title,
            description: data.description || '',
            startDate: data.startDate,
            endDate: data.endDate || '',
        };

        console.log('이력 정보:', careerData);
        return careerData;
    } catch (error) {
        console.error(`getCareer Error:`, error);
        throw error;
    }
};
