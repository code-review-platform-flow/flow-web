import React, { useState } from 'react';
import Container from '@/widgets/container/Container';
import Image from 'next/image';
import ProfileExample from '../../../../public/images/profileImageExample.png';
import SendIcon from '../../../../public/icons/coffeeChatSendIcon.svg';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import styled from 'styled-components';
import TossPaymentAPI from '@/features/coffee-chat/ui/TossPaymentAPI';
import Button from '@/widgets/button/Button';
import { useRecoilValue } from 'recoil';
import { authDataState } from '@/features/auth/model';
import { coffeeChatDataState } from '../model';
import { sharedEmailState } from '@/features/user/model';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '@/features/user/api/getUserInfo';

const CoffeeChatSendContainer: React.FC = () => {
    const authData = useRecoilValue(authDataState);
    const coffeeChat = useRecoilValue(coffeeChatDataState);
    const [contents, setContents] = useState('');
    const { hostEmail, visitorEmail } = useRecoilValue(sharedEmailState);

    const {
        data: senderData,
        isLoading: isSenderLoading,
        error: senderError,
    } = useQuery({
        queryKey: ['senderUserInfo', visitorEmail],
        queryFn: () => getUserInfo(hostEmail, visitorEmail),
        enabled: !!hostEmail && !!visitorEmail,
    });

    const {
        data: receiverData,
        isLoading: isReceiverLoading,
        error: receiverError,
    } = useQuery({
        queryKey: ['receiverUserInfo', hostEmail],
        queryFn: () => getUserInfo(hostEmail, visitorEmail),
        enabled: !!hostEmail && !!visitorEmail,
    });

    if (isSenderLoading || isReceiverLoading) return <div>로딩 중...</div>;
    if (senderError) return <div>발신자 정보 로딩 중 오류가 발생했습니다: {senderError.message}</div>;
    if (receiverError) return <div>수신자 정보 로딩 중 오류가 발생했습니다: {receiverError.message}</div>;
    if (!senderData || !receiverData) return <div>프로필 데이터를 사용할 수 없습니다</div>;

    const coffeeChatData = {
        sender: visitorEmail,
        receiver: hostEmail,
        senderName: senderData.userName,
        receiverName: receiverData.userName,
        senderImage: '/images/profileImageExample.png',
        receiverImage: '/images/profileImageExample.png',
        contents: '',
    };

    console.log(coffeeChatData);

    return (
        <Container width="800px" height="600px">
            <CoffeeChatWrapper $alignItems="center">
                <CoffeeChatTitle>{coffeeChatData.senderName}님에게 커피챗 요청하기</CoffeeChatTitle>

                <RowWrapper gap="2.25em" justifyContent="center">
                    <StyledImage src={coffeeChatData.senderImage} alt="sender" width={150} height={150} />
                    <Image src={SendIcon} alt="보내기아이콘" />
                    <StyledImage src={coffeeChatData.receiverImage} alt="receiver" width={150} height={150} />
                </RowWrapper>

                <StyledColumnWrapper>
                    <CoffeeChatSemiTitle>
                        {coffeeChatData.receiverName}님에게 요청 메시지를 남겨보세요*
                    </CoffeeChatSemiTitle>
                    <CoffeeChatContent value={contents} onChange={(e) => setContents(e.target.value)} placeholder="" />
                </StyledColumnWrapper>

                <TossPaymentAPI sender={coffeeChatData.sender} receiver={coffeeChatData.receiver} contents={contents} />
            </CoffeeChatWrapper>
        </Container>
    );
};

export default CoffeeChatSendContainer;

// Styled Components
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
