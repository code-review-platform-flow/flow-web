import apiClient from '@/shared/api/apiClient';
import { UserInfo } from '@/shared/type/user';

export const getUserInfo = async (
    hostEmail: string | undefined,
    visitorEmail: string | undefined,
): Promise<UserInfo> => {
    if (!hostEmail || !visitorEmail) {
        throw new Error('Host email and visitor email are required');
    }

    const response = await apiClient.get(`user`, {
        searchParams: {
            hostEmail,
            visitorEmail,
        },
    });

    if (!response.ok) {
        throw new Error('유저 정보 데이터를 가져오는 중 오류가 발생했습니다.');
    }

    const data = await response.json();
    return data as UserInfo;
};
