import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import React from 'react';
import styled from 'styled-components';
import { Medium } from './Font';
import Container from '@/widgets/container/Container';
import Button from '@/widgets/button/Button';
import Image from 'next/image';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Link from 'next/link';
import { UserSummary } from '@/shared/type/user';
import { useRecoilValue } from 'recoil';
import { userSummaryState } from '@/entities/auth/model';
import { encodeBase64 } from '@/shared/hook/base64';
import { useRouter } from 'next/navigation';

interface CoffeeChatListProps {
    coffechatData: UserSummary[];
}

const CoffeeChatList: React.FC<CoffeeChatListProps> = ({ coffechatData }) => {
    const authData = useRecoilValue(userSummaryState);
    const router = useRouter();

    const handleNavigation = (email: string) => {
        const encodedEmail = encodeBase64(email);
        router.push(`/user?email=${encodedEmail}`);
    };

    const handleCoffeeChat = (email: string, name: string, photo: string) => {
        const chatData = {
            sender: {
                email: authData?.email,
                name: authData?.userName,
                photo: authData?.profileUrl,
            },
            receiver: {
                email,
                name,
                photo,
            },
            contents: '',
        };

        const encodedChatData = encodeBase64(chatData);
        router.push(`/coffee-chat?data=${encodedChatData}`);
    };

    return (
        <ColumnWrapper gap="0.75em">
            <Medium>☕️ 커피챗 신청하기</Medium>
            <Container size="small" width="100%" height="100%">
                <ColumnWrapper gap="0.75em">
                    {coffechatData.map((item, index) => (
                        <UserInfo onClick={() => handleNavigation(item.email)} key={index}>
                            <StyledRowWrapper>
                                <Rank>{index + 1}</Rank>
                                <ProfileImage
                                    src={item.profileUrl}
                                    alt={`Profile image of ${item.userName}`}
                                    width={50}
                                    height={50}
                                />
                                <Username>{item.userName}</Username>
                            </StyledRowWrapper>
                            <Button
                                onClick={() => handleCoffeeChat(item.email, item.userName, item.profileUrl)}
                                tertiary
                                size="small"
                                label="신청"
                            />
                        </UserInfo>
                    ))}
                </ColumnWrapper>
            </Container>
        </ColumnWrapper>
    );
};

export default CoffeeChatList;

const StyledRowWrapper = styled(RowWrapper)`
    width: auto;
`;

const UserInfo = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5em;
    width: 100%;
`;

const Rank = styled.div`
    font-size: 0.875em;
    color: #8e8e8e;
    width: 1em;
`;

const ProfileImage = styled(Image)`
    border-radius: 10px;
    margin-right: 0.5em;
    width: 2em;
    height: 2em;
`;

const Username = styled.div`
    font-size: 0.8125em;
`;
