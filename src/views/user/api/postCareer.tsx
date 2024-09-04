import apiClient from '@/shared/api/apiClient';

// 특정 유저의 학력 수정
export const postCareer = async (
    email: string,
    careerId: number,
    title: string,
    descreption: string,
    startDate: string,
    endDate: string,
): Promise<{}> => {
    try {
        const response = await apiClient
            .post(`user/career`, {
                json: { email, careerId, title, descreption, startDate, endDate },
            })
            .json();

        if (!response) {
            throw new Error(' 유저 이력을 등록하는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`postCareer Error :`, error);
        throw error;
    }
};
