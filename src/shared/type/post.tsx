// 특정 게시물의 요약 정보를 나타내는 타입 정의
export interface PostSummary {
    postId: number; // 게시물의 고유 ID
}

// 태그를 나타내는 인터페이스
export interface Tag {
    tagName: string; // 태그 이름을 나타내는 문자열
}

// 게시물(Post)을 나타내는 인터페이스
export interface Post {
    email: string; // 사용자의 이메일 주소
    category: string; // 게시물의 카테고리 (예: 코드리뷰, 질문 등)
    tags: Tag[]; // 태그의 배열, 각 태그는 Tag 인터페이스를 따름
    title: string; // 게시물의 제목
    content: string; // 게시물의 내용
}

// 특정 게시물의 상세 정보를 나타내는 타입 정의
export interface PostDetail {
    postId: number; // 게시물의 고유 ID
    title: string; // 게시물 제목
    content: string; // 게시물 내용
    userName: string; // 작성자 이름
    profileUrl: string; // 작성자 프로필 이미지 URL
    majorName: string; // 작성자의 전공 이름
    studentNumber: string; // 작성자의 학번
    categoryName: string; // 게시물 카테고리 이름
    tags: Tag[];// 게시물에 포함된 태그 목록
    createDate: string; // 게시물 생성 날짜 (ISO 형식)
}

// Reply 타입 정의
export interface Reply {
    own: boolean; // 답글의 소유 여부
    replyId: number; // 답글 ID
    profileUrl: string; // 프로필 이미지 URL
    userName: string; // 사용자 이름
    majorName: string; // 전공 이름
    studentNumber: string; // 학번
    replyContent: string; // 답글 내용
}

// Comment 타입 정의
export interface Comment {
        own: boolean; // 댓글의 소유 여부
        commentId: number; // 댓글 ID
        profileUrl: string; // 프로필 이미지 URL
        userName: string; // 사용자 이름
        majorName: string; // 전공 이름
        studentNumber: string; // 학번
        commentContent: string; // 댓글 내용
        replies: Reply[]; // Reply 타입의 배열
}

