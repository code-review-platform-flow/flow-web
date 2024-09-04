import apiClient from '@/shared/api/apiClient';

// 특정 유저의 학력 수정
export const postEducation = async (
    email: string,
    educationId: number,
    schoolName: string,
    startDate: string,
    endDate: string,
): Promise<{}> => {
    try {
        const response = await apiClient
            .post(`user/education`, {
                json: { email, educationId, schoolName, startDate, endDate },
            })
            .json();

        if (!response) {
            throw new Error(' 유저 정보 데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`postEducation Error :`, error);
        throw error;
    }
};
