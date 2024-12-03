import apiClient from '@/shared/api/apiClient';

// User 타입 정의
interface User {
    id: number;
    email: string;
    name: string;
    // 필요한 추가 속성들
}

// getUserFromDb 함수 정의
async function getUserFromDb(email: string, password: string): Promise<User | null> {
    try {
        const body = {
            email,
            password,
        };

        const userData = await apiClient.post(`auth/login`, { json: body }).json<User>(); // 서버에서 반환하는 데이터의 타입을 명확히 지정

        return userData; // 사용자 데이터 반환
    } catch (error) {
        console.error('Error in getUserFromDb:', error);
        return null; // 오류 발생 시 null 반환
    }
}

export default getUserFromDb;
