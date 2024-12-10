import apiClient from '@/shared/api/apiClient';

export const patchUserOneLines = async (email: string, oneLiner: string): Promise<{}> => {
    try {
        const data = await apiClient
            .patch(`user/one-liner`, {
                json: {
                    email,
                    oneLiner,
                },
            })
            .json();

        if (!data) {
            throw new Error('유저 한글 소개를 수정하는 중 오류가 발생했습니다.');
        }

        return data;
    } catch (error) {
        console.error(`patchUserOneLines Error`, error);
        throw error;
    }
};
