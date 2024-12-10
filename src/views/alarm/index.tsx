'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import React, { useEffect, useState } from 'react';
import MailCategoryContainer from './ui/MailCategoryContainer';
import MailList from './ui/AlarmList';
import FlexWrapper from '../user/ui/FlexWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { redirect } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { authDataState } from '@/entities/auth/model';
import { getAlarm } from './api/getAlarm';
import { AlarmListItem } from './model/type';
import AlarmList from './ui/AlarmList';

const AlarmPage = () => {
    const [alarmData, setAlarmData] = useState<AlarmListItem[]>([]); // Coffechat 타입 지정
    const [loading, setLoading] = useState(true);
    const authData = useRecoilValue(authDataState);

    if (!authData?.email) {
        redirect('/');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAlarm(authData?.email);
                setAlarmData(data);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <PageWrapper>
            <FlexWrapper>
                {loading ? <div>로딩 중...</div> : <AlarmList email={authData?.email} alarmData={alarmData} />}
            </FlexWrapper>
        </PageWrapper>
    );
};

export default AlarmPage;
