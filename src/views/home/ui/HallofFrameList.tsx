import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import React from 'react';
import styled from 'styled-components';
import { Medium } from './Font';
import Container from '@/widgets/container/Container';
import Button from '@/widgets/button/Button';

const HallofFrameList = () => {
    return (
        <ColumnWrapper>
            <Medium>🏆 명예의 전당!</Medium>
            <Container size='small' width='100%'>
                <Button tertiary label='더보기' size='wide'/>
            </Container>
        </ColumnWrapper>
    );
};

export default HallofFrameList;

