import React, { useState } from 'react';
import Container from '@/widgets/container/Container';
import Image from 'next/image';
import profileImageUrl from '../../../public/images/profileImageExample.png';
import sendIconUrl from '../../../public/icons/coffeeChatSendIcon.svg';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import styled from 'styled-components';
import TossPaymentAPI from '@/entities/coffee-chat/ui/TossPaymentAPI';
import Button from '@/widgets/button/Button';

interface CoffeeChatProps {
    senderName: string;
    receiverName: string;
    senderImage: string;
    receiverImage: string;
    content?: string;
}

const CoffeeChatSendContainer: React.FC<CoffeeChatProps> = ({
    senderName,
    receiverName,
    senderImage = profileImageUrl,
    receiverImage = profileImageUrl,
    content = '',
}) => {
    const [contents, setContents] = useState(content);

    return (
        <Container width="800px" height="600px">
            <CoffeeChatWrapper $alignItems="center">
                <CoffeeChatTitle>{senderName}님에게 커피챗 요청하기</CoffeeChatTitle>

                <RowWrapper gap="2.25em" justifyContent="center">
                    <StyledImage src={senderImage} alt="sender" priority width={16} height={16} />
                    <Image src={sendIconUrl} alt="보내기아이콘" width={16} height={16} />
                    <StyledImage src={receiverImage} alt="receiver" priority width={16} height={16} />
                </RowWrapper>

                <StyledColumnWrapper>
                    <CoffeeChatSemiTitle>{receiverName}님에게 요청 메시지를 남겨보세요*</CoffeeChatSemiTitle>
                    <CoffeeChatContent
                        value={contents}
                        onChange={(e) => setContents(e.target.value)}
                        placeholder="메시지를 입력하세요"
                    />
                </StyledColumnWrapper>

                <TossPaymentAPI contents={contents} />
            </CoffeeChatWrapper>
        </Container>
    );
};

export default CoffeeChatSendContainer;

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
`;

const StyledImage = styled(Image)`
    width: 150px;
    height: 150px;
    @media (max-width: 768px) {
        width: 100px;
        height: 100px;
    }
`;

const StyledButton = styled(Button)`
    font-size: 1.125em;
`;
