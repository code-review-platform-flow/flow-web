import Container from '@/widgets/container/Container';
import React, { useState } from 'react';
import ProfileExample from '../../../../public/images/profileImageExample.png';
import Image from 'next/image';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import SendIcon from '../../../../public/icons/coffeeChatSendIcon.svg';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import styled from 'styled-components';
import Button from '@/widgets/button/Button';
import Link from 'next/link';
import TossPaymentAPI from '@/features/coffee-chat/api/TossPaymentAPI';

interface CoffeeChatSendContainerProps {}

const CoffeeChatSendContainer: React.FC<CoffeeChatSendContainerProps> = ({}) => {
    const [coffeeChatSuccess, setcoffeeChatSuccess] = useState(false);

    const coffeeChatData = [
        {
            senderName: '지민성',
            receiverName: '박찬영',
            coffeeChatContent: '',
            senderImage: ProfileExample,
            receiverImage: ProfileExample,
        },
    ];

    // 임시 구현
    const submitCoffeeChat = () => {
        setcoffeeChatSuccess(!coffeeChatSuccess);
    };

    return (
        <>
            {coffeeChatData.map((chat, index) => (
                <Container key={index} width="800px" height="600px" round>
                    <CoffeeChatWrapper alignItems="center">
                        <CoffeeChatTitle>
                            {coffeeChatSuccess ? '커피챗을 요청 했어요!' : `${chat.senderName}님에게 커피챗 요청하기`}
                        </CoffeeChatTitle>
                        {coffeeChatSuccess ? (
                            <CoffeeChatStatus>
                                {chat.receiverName}님이 수락하시면 대화를 시작하실 수 있어요.
                                <br />
                                조금만 기다려주세요!
                            </CoffeeChatStatus>
                        ) : (
                            <>
                                <RowWrapper gap="2.25em" justifyContent="center">
                                    <StyledImage src={chat.senderImage} alt="sender" />
                                    <Image src={SendIcon} alt="보내기아이콘" />
                                    <StyledImage src={chat.receiverImage} alt="receiver" />
                                </RowWrapper>

                                <StyledColumnWrapper>
                                    <CoffeeChatSemiTitle>
                                        {chat.receiverName}님에게 요청 메시지를 남겨보세요*
                                    </CoffeeChatSemiTitle>
                                    <CoffeeChatContent placeholder=""></CoffeeChatContent>
                                </StyledColumnWrapper>
                            </>
                        )}
                        {coffeeChatSuccess ? (
                            <StyledButton $primary label="메인으로" size="wide" onClick={() => submitCoffeeChat()} />
                        ) : (
                            <TossPaymentAPI onClick={() => submitCoffeeChat()} />
                        )}
                    </CoffeeChatWrapper>
                </Container>
            ))}
        </>
    );
};

export default CoffeeChatSendContainer;

const CoffeeChatStatus = styled.div`
    font-size: 1.25em;
    text-align: center;
    color: #828282;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -2em;
    @media (max-width: 768px) {
        font-size: 1em;
        margin-bottom: 2em;
        margin-top: 0em;
    }
`;
const CoffeeChatWrapper = styled(ColumnWrapper)`
    height: 100%;
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
