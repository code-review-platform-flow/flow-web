import React, { useState } from 'react';
import Container from '@/widgets/container/Container';
import Image from 'next/image';
import sendIconUrl from '../../../public/icons/coffeeChatSendIcon.svg';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import styled from 'styled-components';
import TossPaymentAPI from '@/views/coffee-chat/ui/TossPaymentAPI';
import Button from '../button/Button';

interface CoffeeChatProps {
    type: 'received' | 'sent' | 'pay'; // 커피챗 유형
    senderName: string;
    receiverName: string;
    senderImage: string;
    receiverImage: string;
    content?: string;
}

const CoffeeChatSendContainer: React.FC<CoffeeChatProps> = ({
    type,
    senderName,
    receiverName,
    senderImage,
    receiverImage,
    content = '',
}) => {
    const [messageContent, setMessageContent] = useState(content);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(e.target.value);
    };

    return (
        <Container width="800px" height="600px">
            <CoffeeChatWrapper $alignItems="center">
                <CoffeeChatTitle>
                    {type === 'pay'
                        ? `${receiverName}님에게 보낼 커피챗`
                        : type === 'received'
                        ? `${senderName}님이 보낸 커피챗`
                        : `${receiverName}님에게 보낸 커피챗`}
                </CoffeeChatTitle>

                <RowWrapper gap="2.25em" justifyContent="center">
                    <StyledImage src={senderImage} alt="sender" priority width={150} height={150} />
                    <Image src={sendIconUrl} alt="보내기아이콘" width={16} height={16} />
                    <StyledImage src={receiverImage} alt="receiver" priority width={150} height={150} />
                </RowWrapper>

                <StyledColumnWrapper>
                    <CoffeeChatSemiTitle>
                        {type === 'pay'
                            ? `${receiverName}님에게 보낼 메시지 내용을 작성해주세요`
                            : type === 'received'
                            ? `${receiverName}님에게 답장을 남겨보세요.`
                            : `${receiverName}님에게 보낸 메시지 내용입니다.`}
                    </CoffeeChatSemiTitle>
                    <CoffeeChatContent
                        value={messageContent}
                        onChange={handleContentChange}
                        placeholder="메시지를 입력하세요"
                        disabled={type === 'sent'}
                    />
                </StyledColumnWrapper>

                {type === 'pay' && <TossPaymentAPI contents={messageContent} />}
                {type === 'received' && <Button label="수락하기" onClick={() => alert('수락되었습니다.')} />}
            </CoffeeChatWrapper>
        </Container>
    );
};

export default CoffeeChatSendContainer;

// Styled Components
const CoffeeChatWrapper = styled(ColumnWrapper)<{ $alignItems?: string }>`
    height: 100%;
    align-items: ${(props) => props.$alignItems};
`;

const StyledColumnWrapper = styled(ColumnWrapper)`
    margin-top: 4em;
    height: 100%;
`;

const CoffeeChatTitle = styled.div`
    font-size: 1.125em;
    font-weight: 500;
    margin-bottom: 63px;
    @media (max-width: 768px) {
        margin-bottom: 2em;
    }
`;

const CoffeeChatSemiTitle = styled.div`
    font-size: 1.125em;
    color: #828282;
`;

const CoffeeChatContent = styled.textarea`
    resize: none;
    border: none;
    font-size: 1.125em;
    font-family: 'Pretendard';
    background-color: #f5f5f7;
    border-radius: 10px;
    width: 100%;
    height: 180px;
    padding: 1em;
    box-sizing: border-box;
    margin-top: 12px;
    margin-bottom: 4px;

    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: #e9e9e9;
    }
`;

const StyledImage = styled(Image)`
    width: 150px;
    height: 150px;
    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
    }
`;
