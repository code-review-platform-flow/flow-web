import apiClient from '@/shared/api/apiClient';
import { UserSummary } from '@/shared/type/user';
import { getUserSummary } from '@/shared/api/user/getUserSummary'; // UserSummary API 가져오기
import { FolloweeResponse, FollowerResponse } from '../model/type';

export const getFollowerList = async (
    email: string,
): Promise<{
    followers: UserSummary[];
    followees: UserSummary[];
}> => {
    try {
        // API 호출
        const followeeResponse = await apiClient.get(`follow/followee-list/${email}`).json<FolloweeResponse>();

        const followerResponse = await apiClient.get(`follow/follower-list/${email}`).json<FollowerResponse>();

        // `UserSummary` 리스트 생성
        const followers = await Promise.all(
            followerResponse.followerList.map(async (item) => await getUserSummary(item.followerEmail)),
        );

        const followees = await Promise.all(
            followeeResponse.followeeList.map(async (item) => await getUserSummary(item.followeeEmail)),
        );

        return { followers, followees };
    } catch (error) {
        console.error('팔로우/팔로워 리스트 요청 중 오류 발생:', error);
        throw new Error('팔로우/팔로워 리스트를 가져오는 중 오류가 발생했습니다.');
    }
};
