import apiClient from '@/shared/api/apiClient';

// API 호출 함수
export const fetchSearchResults = async (searchTerm: string) => {
    try {
        const response: any = await apiClient.get(`post/search/${searchTerm}/1/10`) // 페이지와 개수는 예시로 1, 10으로 설정
        const data = await response.json();
        return data.findByKeywordDtoList.map((item: { postId: number }) => item.postId); // response.data에 실제 데이터가 담겨 있을 것
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error; 
    }
};
