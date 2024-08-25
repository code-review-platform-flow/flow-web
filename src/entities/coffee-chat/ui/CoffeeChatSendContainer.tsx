import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { coffeeChatSuccessState } from '@/entities/coffee-chat/model';
import Container from '@/widgets/container/Container';
import Image from 'next/image';
import ProfileExample from '../../../../public/images/profileImageExample.png';
import SendIcon from '../../../../public/icons/coffeeChatSendIcon.svg';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import Button from '@/widgets/button/Button';
import styled from 'styled-components';
import TossPaymentAPI from '@/features/coffee-chat/api/TossPaymentAPI';
import { useSendCoffeeChat } from '@/features/coffee-chat/api/coffeeChatApi';

const CoffeeChatSendContainer: React.FC = () => {
    const [coffeeChatSuccess, setCoffeeChatSuccess] = useRecoilState(coffeeChatSuccessState);
    const [contents, setContents] = useState('');

    const coffeeChatData = {
        senderName: '지민성',
        receiverName: '박찬영',
        coffeeChatContent: '',
        senderImage: ProfileExample,
        receiverImage: ProfileExample,
    };

    const { mutate: sendCoffeeChat } = useSendCoffeeChat({
        onSuccess: (data) => {
            console.log('Coffee chat sent successfully:', data);
            setCoffeeChatSuccess(true);
        },
        onError: (error) => {
            console.error('Error sending coffee chat:', error);
        },
    });

    const handleSubmit = () => {
        sendCoffeeChat({
            sender: 'iam123@gachon.ac.kr',
            receiver: 'you123@gachon.ac.kr',
            contents,
        });
    };

    return (
        <Container width="800px" height="600px" round>
            <CoffeeChatWrapper alignItems="center">
                <CoffeeChatTitle>
                    {coffeeChatSuccess ? '커피챗을 요청 했어요!' : `${coffeeChatData.senderName}님에게 커피챗 요청하기`}
                </CoffeeChatTitle>
                {coffeeChatSuccess ? (
                    <CoffeeChatStatus>
                        {coffeeChatData.receiverName}님이 수락하시면 대화를 시작하실 수 있어요.
                        <br />
                        조금만 기다려주세요!
                    </CoffeeChatStatus>
                ) : (
                    <>
                        <RowWrapper gap="2.25em" justifyContent="center">
                            <StyledImage src={coffeeChatData.senderImage} alt="sender" />
                            <Image src={SendIcon} alt="보내기아이콘" />
                            <StyledImage src={coffeeChatData.receiverImage} alt="receiver" />
                        </RowWrapper>

                        <StyledColumnWrapper>
                            <CoffeeChatSemiTitle>
                                {coffeeChatData.receiverName}님에게 요청 메시지를 남겨보세요*
                            </CoffeeChatSemiTitle>
                            <CoffeeChatContent
                                value={contents}
                                onChange={(e) => setContents(e.target.value)}
                                placeholder=""
                            />
                        </StyledColumnWrapper>
                    </>
                )}
                {coffeeChatSuccess ? (
                    <StyledButton $primary label="메인으로" size="wide" onClick={() => setCoffeeChatSuccess(false)} />
                ) : (
                    <TossPaymentAPI onClick={handleSubmit} />
                )}
            </CoffeeChatWrapper>
        </Container>
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
