'use client';
import React from 'react';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import styled from 'styled-components';
import { AlarmListItem } from '../model/type';
import AlarmListItemCotainer from './AlarmListItemCotainer';

interface AlarmListProps {
    alarmData: AlarmListItem[];
    email: string;
}

const AlarmList: React.FC<AlarmListProps> = ({ alarmData, email }) => {
    return (
        <>
            <ColumnWrapper gap="1em">
                <Title>받은 알람</Title>
                {alarmData.length === 0 ? (
                    <NoDataMessage>받은 알람이 없습니다.</NoDataMessage>
                ) : (
                    alarmData.map((alarm, i) => {
                        return <AlarmListItemCotainer email={email} key={i} alarm={alarm} />;
                    })
                )}
            </ColumnWrapper>
        </>
    );
};

export default AlarmList;

const Title = styled.div`
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 1em;
    @media (max-width: 768px) {
        font-size: 1.25em;
    }
`;

const NoDataMessage = styled.div`
    font-size: 1em;
    color: #707070;
    text-align: center;
    margin-top: 2em;
`;
