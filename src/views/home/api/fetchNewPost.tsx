import apiClient from '@/shared/api/apiClient';

// 최신 포스트 ID를 가져오는 함수
export const fetchNewPost = async (): Promise<number> => {
    const response = await apiClient.get(`post/latest`);

    if (!response.ok) {
        throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
    }

    // JSON 데이터를 파싱하여 반환
    const data: { postId: number } = await response.json();
    return data.postId;
};
