import apiClient from '@/shared/api/apiClient';

// Major 타입 정의
interface Major {
    majorId: number;
    majorName: string;
}

// API 응답 타입 정의
interface FetchMajorsResponse {
    majorGetAllDtoList: Major[];
}

export const fetchMajors = async (): Promise<Major[]> => {
    try {
        const response = await apiClient.get('auth/major');
        const data: FetchMajorsResponse = await response.json();
        return data.majorGetAllDtoList;
    } catch (error) {
        console.error('학과 데이터를 가져오는 중 오류 발생:', error);
        throw error;
    }
};
