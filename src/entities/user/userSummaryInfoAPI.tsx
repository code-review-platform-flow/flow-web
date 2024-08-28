import ky from 'ky';

export const userSummaryInfoAPI = async (email: string): Promise<any> => {
    const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/summary`, {
        searchParams: { email }  
    }).json();
    console.log(response)

    if (!response) {
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }
    
    return response
};
