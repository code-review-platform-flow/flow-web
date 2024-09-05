import { PostSummary } from './post';

// 교육 정보를 나타내는 인터페이스
export interface Education {
    educationId: number; // 교육 ID
}

export interface EducationData {
    educationId : number;
    startDate: string;
    endDate: string;
    schoolName: string;
}

// 경력 정보를 나타내는 인터페이스
export interface Career {
    careerId: number; // 경력 ID
}

// 경력 정보를 나타내는 인터페이스
export interface CareerData {
    title: string,
    description: string,
    startDate: string,
    endDate: string;
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
    postIdList: PostSummary[]; // 게시물 목록
}

export interface UserSummary {
    majorName: string;
    userName: string;
    studentNumber: string;
    profileUrl: string;
    email: string;
}
