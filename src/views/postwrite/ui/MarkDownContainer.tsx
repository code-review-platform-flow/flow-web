import Container from '@/widgets/container/Container';
import React from 'react';
import { PosrtWriteTitle } from './Font';

interface MarkDownContainerProps {
}

const MarkDownContainer: React.FC<MarkDownContainerProps> = ({  }) => {
    return (
        <Container size='wide'>
            <PosrtWriteTitle>내용</PosrtWriteTitle>
        </Container>
    );
};

export default MarkDownContainer;