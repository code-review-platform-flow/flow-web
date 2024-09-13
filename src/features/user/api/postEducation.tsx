import apiClient from '@/shared/api/apiClient';

// 특정 유저의 학력 수정 또는 추가
export const postEducation = async (
    email: string,
    educationId: number | undefined, // null 가능하도록 수정
    schoolName: string | "",
    startDate: string,
    endDate: string | "",
): Promise<{}> => {
    try {
        // 요청할 데이터를 동적으로 구성
        const requestData: any = { educationId, email, schoolName, startDate, endDate };
        console.log(requestData)
        // educationId가 존재하면 수정 모드로 추가
        if (educationId !== null) {
            requestData.educationId = educationId;
        }

        const response = await apiClient
            .post(`user/education`, {
                json: requestData, 
            })
            .json();

        if (!response) {
            throw new Error(' 유저 정보 데이터를 가져오는 중 오류가 발생했습니다.');
        }

        console.log(response);
        return response;
    } catch (error) {
        console.error(`postEducation Error :`, error);
        throw error;
    }
};
