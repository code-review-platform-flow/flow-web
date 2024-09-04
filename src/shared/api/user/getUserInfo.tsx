import { UserInfo } from '@/shared/type/user';
import ky from 'ky';

// 특정 게시물의 상세 정보를 가져오는 함수
export const getUserInfo = async (hostEmail: string, visitorEmail: string): Promise<UserInfo> => {
    try {
        const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
            searchParams: {
                hostEmail,
                visitorEmail,
            },
        });

        if (!response.ok) {
            throw new Error(' 유저 정보 데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log(data);
        return data as UserInfo;
    } catch (error) {
        console.error(`getUserInfo Error :`, error);
        throw error;
    }
};
