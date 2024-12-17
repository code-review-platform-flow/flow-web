'use client';
import apiClient from '@/shared/api/apiClient';
import { useEffect, useState } from 'react';

interface Alarm {
    alarmId: number;
    userId: number;
    alarmType: string;
    message: string;
    isRead: boolean;
    referenceId: number;
    referenceTable: string;
}

interface AlarmResponse {
    items: Alarm[];
}

const useAlarms = (email: string) => {
    const [unreadCount, setUnreadCount] = useState<number>(0);

    const fetchAlarms = async () => {
        try {
            const response = await apiClient.get(`alarm`, { searchParams: { email } });
            const data: AlarmResponse = await response.json(); // 여기서 json() 호출

            const unreadAlarms = data.items.filter((alarm) => !alarm.isRead);
            setUnreadCount(unreadAlarms.length);
        } catch (error) {
            console.error('알람 데이터를 불러오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchAlarms(); // 최초 실행
        const interval = setInterval(fetchAlarms, 10000); // 10초마다 실행
        return () => clearInterval(interval); // 클린업
    }, [email]);

    return unreadCount;
};

export default useAlarms;
