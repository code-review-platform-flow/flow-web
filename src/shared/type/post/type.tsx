// 특정 게시물의 요약 정보를 나타내는 타입 정의
export interface PostSummary {
    postId: number;
}

// 특정 게시물의 상세 정보를 나타내는 타입 정의 
export interface PostDetail {
    postId: number;
    title: string;
    content: string;
    userName: string;
    profileUrl: string;
    majorName: string;
    studentNumber: string;
    categoryName: string;
    tags: {
        tagName: string;
    }[];
    createDate: string;
}
