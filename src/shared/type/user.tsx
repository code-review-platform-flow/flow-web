// 교육 정보를 나타내는 인터페이스
interface Education {
    educationId: number; // 교육 ID
}

// 경력 정보를 나타내는 인터페이스
interface Career {
    careerId: number; // 경력 ID
}

// 게시물 정보를 나타내는 인터페이스
interface PostSummary {
    postId: number; // 게시물 ID
}

// 사용자 정보를 나타내는 인터페이스
export interface UserInfo {
    own: boolean; // 사용자가 자신의 프로필을 소유하고 있는지 여부
    followHost: boolean; // 사용자가 호스트를 팔로우하고 있는지 여부
    profileUrl: string; // 사용자 프로필 URL
    userName: string; // 사용자 이름
    majorName: string; // 전공 이름
    studentNumber: string; // 학번
    oneLiner: string; // 짧은 자기소개
    followerCount: number; // 팔로워 수
    educationList: Education[]; // 교육 목록
    careerList: Career[]; // 경력 목록
    postList: PostSummary[]; // 게시물 목록
}
