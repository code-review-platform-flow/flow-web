import apiClient from '../apiClient';

// 서버에서 반환할 데이터 타입 정의
interface AlarmResponse {
    id: string;
    message: string;
    timestamp: string;
}

// 롱 폴링 함수
export const getAlarmLongPolling = async (email: string): Promise<void> => {
    try {
        // 서버로 GET 요청 보내기 (email을 query parameter로 포함)
        const response = await apiClient.get('alarm', {
            searchParams: { email }, // email을 쿼리 파라미터로 전달
        });
        // 서버 응답 데이터 처리
        const alarmList = response;
        console.log('알람 목록:', alarmList);
        // 여기서 받은 데이터를 처리 (예: 화면 갱신, 상태 업데이트 등)
        // 예: console.log(alarmList);
        // 재귀 호출로 다음 요청 수행
        getAlarmLongPolling(email);
    } catch (error) {
        console.error('오류 발생:', error);
        // 오류가 발생한 경우 일정 시간 후 다시 요청
        setTimeout(() => {
            getAlarmLongPolling(email);
        }, 10000); // 10초 후 재시도
    }
};
// 이메일 주소로 롱 폴링 시작
const email = 'user@example.com';
getAlarmLongPolling(email);
