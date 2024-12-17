'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { AlarmListItem } from '../model/type';
import filterTime from '@/shared/hook/filterTime';
import Container from '@/widgets/container/Container';
import { postAlarmConfirm } from '../api/postAlarmConfirm';

interface AlarmListItemCotainerProps {
    alarm: AlarmListItem;
    email: string;
}

const AlarmListItemCotainer: React.FC<AlarmListItemCotainerProps> = ({ email, alarm }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleAlarmConfirm = async () => {
        try {
            await postAlarmConfirm(alarm.alarmId, email);
            console.log('알람 확인 성공');
            setIsVisible(false);
        } catch (error) {
            console.error('알람 확인 실패:', error);
        }
    };

    if (!isVisible) return null;

    return (
        <Container key={alarm.alarmId} round>
            <RowWrapper onClick={handleAlarmConfirm} style={{ cursor: 'pointer' }} gap="1em">
                <ColumnWrapper>
                    <SubTitle>{alarm.alarmType}</SubTitle>
                    <Part>{alarm.message}</Part>
                    <RowWrapper>
                        <Time>{filterTime(alarm.createDate)}</Time>
                    </RowWrapper>
                </ColumnWrapper>
            </RowWrapper>
        </Container>
    );
};

export default AlarmListItemCotainer;

const SubTitle = styled.div`
    font-size: 0.8125em;
    font-weight: 500;
    margin: 1em 0;
`;

const Part = styled.div`
    font-size: 1em;
    color: #707070;
    margin-bottom: 1em;
`;

const Time = styled.div`
    font-size: 0.875em;
    color: #707070;
`;
