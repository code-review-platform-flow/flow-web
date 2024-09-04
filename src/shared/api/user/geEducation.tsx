import ky from 'ky';

// 특정 유저의 특정 학력 정보를 가져오는 함수
export const getEducation = async (educationId: number): Promise<{}> => {
    try {
        const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/education/${educationId}`).json();

        if (!response) {
            throw new Error(' 유저 학력 정보 데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response;
        console.log(data);
        return data;
    } catch (error) {
        console.error(`getEducation Error :`, error);
        throw error;
    }
};
