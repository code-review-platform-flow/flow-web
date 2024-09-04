import apiClient from '@/shared/api/apiClient';
import { CareerData } from '@/shared/type/user';

// 특정 유저의 특정 이력을 가져오는 함수
export const getCareer = async (careerId: number): Promise<CareerData> => {
    try {
        const response = await apiClient.get(`user/career/${careerId}`);
        const data = await response.json();

        if (!data) {
            throw new Error('유저 이력 정보 데이터를 가져오는 중 오류가 발생했습니다.');
        }

        console.log(data);
        return data as CareerData;
    } catch (error) {
        console.error(`getCareer Error:`, error);
        throw error;
    }
};
