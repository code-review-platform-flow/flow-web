import apiClient from '@/shared/api/apiClient';

// 특정 유저의 특정 이력을 가져오는 함수
export const getCareer = async (careerId: number): Promise<{}> => {
    try {
        const response = await apiClient.get(`user/career/${careerId}`).json();

        if (!response) {
            throw new Error(' 유저 이력 정보 데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`getCareer Error :`, error);
        throw error;
    }
};
