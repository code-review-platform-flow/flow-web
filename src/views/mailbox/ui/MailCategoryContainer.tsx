import Container from '@/widgets/container/Container';
import React, { useState } from 'react';
import styled from 'styled-components';
import SendIcon from '../../../../public/icons/sendIcon2.svg';
import SendIcon2 from '../../../../public/icons/sendIcon3.svg';
import BoxIcon from '../../../../public/icons/boxIcon2.svg';
import BoxIcon2 from '../../../../public/icons/boxIcon3.svg'
import Image from 'next/image';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';

const MailCategoryContainer: React.FC = () => {
    const [selectedButton, setSelectedButton] = useState<'inbox' | 'outbox'>('inbox');

    return (
        <Container width='232px' height='auto'>
            <ColumnWrapper gap='0.25em'>
                <Title>요청들</Title>
                <ReceiveSendButton
                    selected={selectedButton === 'inbox'}
                    onClick={() => setSelectedButton('inbox')}
                > 
                    <StyledIcon src={selectedButton === 'inbox' ? BoxIcon2 : BoxIcon} alt='수신함' selected={selectedButton === 'inbox'} /> 수신함
                </ReceiveSendButton>
                <ReceiveSendButton
                    selected={selectedButton === 'outbox'}
                    onClick={() => setSelectedButton('outbox')}
                >
                    <StyledIcon src={selectedButton === 'outbox'? SendIcon2 : SendIcon} alt='발신함' selected={selectedButton === 'outbox'} /> 발신함
                </ReceiveSendButton>
            </ColumnWrapper>
        </Container>
    );
};

export default MailCategoryContainer;

const Title = styled.div`
    font-size: 0.875em;
    font-weight: 500;
    margin-bottom: 0.75em;
`;

const ReceiveSendButton = styled.div<{ selected: boolean }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
    font-size: 0.8125em;
    font-weight: 500;
    color: ${props => (props.selected ? '#004E96' : '#707070')};
    background-color: ${props => (props.selected ? '#EBF1F7' : '#FFFFFF')};
    width: 100%;
    border-radius: 10px;
    padding: 0.5em 0.75em;
    box-sizing: border-box;
    cursor: pointer;
`;

const StyledIcon = styled(Image)<{ selected: boolean }>`
    width : 10%;
`;
