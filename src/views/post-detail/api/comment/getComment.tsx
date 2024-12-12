import apiClient from '@/shared/api/apiClient';
import { Comment } from '@/shared/type/post';

// 특정 게시물의 상세 정보를 가져오는 함수
export const getComment = async (postId: string, email?: string): Promise<Comment[]> => {
    try {
        const params: Record<string, string | number | boolean> = {};
        if (email) {
            params.email = email; // email이 있는 경우만 추가
        }

        const response = await apiClient.get(`comment/${postId}`, {
            searchParams: params,
        });

        if (!response.ok) {
            throw new Error('댓글을 가져오는 중 오류가 발생했습니다.');
        }

        const data: any = await response.json();
        console.log(data);
        return data.comments as Comment[];
    } catch (error) {
        console.error(`getComment Error for postId ${postId}:`, error);
        throw error;
    }
};
