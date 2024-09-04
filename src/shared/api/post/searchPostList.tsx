import ky from 'ky';

// 특정 게시물의 상세 정보를 가져오는 함수
export const searchPostList = async (keyword:string, page:number, count:number): Promise<[]> => {
    try {
        const response = await ky.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/search/${keyword}/${page}/${count}`);

        if (!response.ok) {
            throw new Error('검색 데이터를 가져오는 중 오류가 발생했습니다.');
        }
        const data = await response.json();
        console.log(data);
        return data as [];

    } catch (error) {
        console.error(`searchPostList Error for postId`, error);
        throw error;
    }
};
