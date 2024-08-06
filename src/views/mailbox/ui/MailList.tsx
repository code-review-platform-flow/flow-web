import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileExample from '../../../../public/images/profileImageExample.png';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';

interface MailListProps {}

const MailList: React.FC<MailListProps> = () => {
    const [selected, setSelected] = useState<'receiveBox' | 'sendBox'>('receiveBox');
    const mailData = {
        coffechat: [
            {
                coffechatId: 1,
                sender: "iam123@gachon.ac.kr",
                senderName: '지민성',
                receiver: "you123@gachon.ac.kr",
                receiverName: '박찬영',
                coffeechatText: "안녕하세요~~~1",
                imgUrl: ProfileExample,
                part: ['프론트엔드개발', '크로스플랫폼앱개발'],
                date: 7,
            },
            {
                coffechatId: 2,
                sender: "iam123@gachon.ac.kr",
                senderName: '지민성',
                receiver: "you123@gachon.ac.kr",
                receiverName: '박찬영',
                coffeechatText: "안녕하세요~~~1",
                imgUrl: ProfileExample,
                part: ['프론트엔드개발', '크로스플랫폼앱개발'],
                date: 5,
            },
        ]
    };

    const filteredData = mailData.coffechat.filter(chat =>
        selected === 'receiveBox' ? chat.receiver === "you123@gachon.ac.kr" : chat.sender === "iam123@gachon.ac.kr"
    );

    return (
        <ColumnWrapper gap='1em'>
            <Title>{selected === 'receiveBox' ? '받은 요청' : '보낸 요청'}</Title>
            {filteredData.map((chat) => (
                <Container key={chat.coffechatId} round>
                    <RowWrapper gap='1em'>
                        <ProfileImage width={100} height={100} src={chat.imgUrl} alt="profile" />
                        <ColumnWrapper>
                            <SubTitle>{selected === 'receiveBox' ? chat.senderName : chat.receiverName}님이 커피챗을 요청했어요!</SubTitle>
                            <Part>{chat.part.join(', ')}</Part>
                            <RowWrapper>
                                <Time>{chat.date}일 전</Time>
                                <State>대기중</State>
                            </RowWrapper>
                        </ColumnWrapper>
                    </RowWrapper>
                </Container>
            ))}
        </ColumnWrapper>
    );
};

export default MailList;

const Title = styled.div`
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 1em;
    @media(max-width : 768px){
        font-size: 1.25em;
    }
`;

const SubTitle = styled.div`
    font-size: 0.8125em
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

const State = styled.div`
    font-size: 0.875em;
    color: #004E96;
    background-color: #EBF1F7;
    padding : 0.25em;
    box-sizing : border-box;
    border-radius : 0.5em;
    margin-left : 0.5em;

`;

const ProfileImage = styled(Image)`
    width: 100%;
    height: auto;
    max-width: 80px;
    border-radius: 50%;
    margin-bottom: 1em;
`;
