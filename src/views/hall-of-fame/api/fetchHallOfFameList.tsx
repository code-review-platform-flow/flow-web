import { getUserSummary } from '@/shared/api/user/getUserSummary';
import { HallOfFameUser } from '../ui/HallOfFameUserContainer';
import ky from 'ky';

// Hall of Fame 사용자 목록을 가져오는 함수
export const fetchHallOfFameList = async (count: number = 9): Promise<HallOfFameUser[]> => {
    const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/hall-of-fame/${count}`);
    if (!response.ok) {
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }

    // JSON 데이터를 파싱하여 반환
    const data = await response.json<{ userList: HallOfFameUser[] }>();
    console.log(data.userList);

    return data.userList;
};

// Hall of Fame 사용자 목록을 가져와 각 사용자의 상세 정보를 얻는 함수
export const fetchHallOfFameListDetail = async (count: number = 9): Promise<any[]> => {
    try {
        // Hall of Fame 사용자 목록을 가져옴
        const userList = await fetchHallOfFameList(count);

        // 각 사용자의 이메일로 사용자 정보를 비동기적으로 가져옴
        const userSummaries = await Promise.all(
            userList.map(async (user) => {
                const userDetails = await getUserSummary(user.email);
                return userDetails;
            }),
        );

        console.log(userSummaries);
        return userSummaries;
    } catch (error) {
        console.error('사용자 요약 정보를 가져오는 중 오류가 발생했습니다:', error);
        throw error;
    }
};
