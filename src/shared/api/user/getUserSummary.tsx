import apiClient from '@/shared/api/apiClient';
import { UserSummary } from '@/shared/type/user';

export const getUserSummary = async (email: string): Promise<UserSummary> => {
    const response = await apiClient
        .get(`user/summary`, {
            searchParams: { email },
        })
        .json<UserSummary>();
    console.log(response);

    if (!response) {
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }

    return response;
};
