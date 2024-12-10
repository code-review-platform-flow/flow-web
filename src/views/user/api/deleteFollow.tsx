import apiClient from '@/shared/api/apiClient';

export const deleteFollow = async (followeeEmail: string, followerEmail: string) => {
    try {
        const requestData = { followerEmail, followeeEmail };
        const response = await apiClient
            .delete('follow/cancel', {
                body: JSON.stringify(requestData),
            })
            .json();

        return response;
    } catch (error) {
        console.error(`postEducation Error:`, error);
        throw new Error(`팔로우 취소 하는 중 오류가 발생했습니다: ${error}`);
    }
};
