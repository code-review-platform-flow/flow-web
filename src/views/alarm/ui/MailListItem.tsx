'use client';
import React from 'react';
import styled from 'styled-components';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { AlarmListItem } from '../model/type';
import filterTime from '@/shared/hook/filterTime';
import Container from '@/widgets/container/Container';

interface MailListItemProps {
    alarm: AlarmListItem;
    onClick?: () => void;
}

const MailListItem: React.FC<MailListItemProps> = ({ alarm, onClick }) => {
    return (
        <Container key={alarm.alarmId} round>
            <RowWrapper onClick={onClick} style={{ cursor: 'pointer' }} gap="1em">
                <ColumnWrapper>
                    <SubTitle>{alarm.alarmType}</SubTitle>
                    <Part>{alarm.messege || '한줄 소개가 없습니다.'}</Part>
                    <RowWrapper>
                        <Time>{filterTime(alarm.createDate)}</Time>
                    </RowWrapper>
                </ColumnWrapper>
            </RowWrapper>
        </Container>
    );
};

export default MailListItem;

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
