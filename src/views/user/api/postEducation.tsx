import apiClient from '@/shared/api/apiClient';

export const postEducation = async (
    email: string,
    educationId: number | null,
    schoolName: string,
    startDate: string,
    endDate: string | '',
) => {
    try {
        const requestData = { email, educationId, schoolName, startDate, endDate };
        const response = await apiClient
            .post('user/education', {
                body: JSON.stringify(requestData),
            })
            .json();

        return response;
    } catch (error) {
        console.error(`postEducation Error:`, error);
        throw new Error(`학력 정보를 업데이트하는 중 오류가 발생했습니다: ${error}`);
    }
};
