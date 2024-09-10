import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import React from 'react';
import styled from 'styled-components';
import { Medium } from './Font';
import Container from '@/widgets/container/Container';
import Button from '@/widgets/button/Button';
import Image from 'next/image';
import ProfileImage2 from '../../../../public/images/profileImageExample2.png';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Link from 'next/link';

//커피챗 데이터
const coffechatData = {
    coffeeChat: [
        {
            coffeeId: 2,
            initiatorUserId: 3,
            recipientUserId: 4,
            contents: '안녕하세요~~~1',
        },
        {
            coffeeId: 3,
            initiatorUserId: 3,
            recipientUserId: 4,
            contents: '안녕하세요~~~1',
        },
    ],
    pageable: {
        pageNumber: 0,
        pageSize: 2,
        sort: {
            empty: true,
            sorted: false,
            unsorted: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
    },
};

const CoffeChatList = () => {
    return (
        <ColumnWrapper gap="0.75em">
            <Medium>☕️ 커피챗 신청하기</Medium>
            <Container size="small" width="100%" height="100%">
                <ColumnWrapper gap="0.75em">
                    {coffechatData.coffeeChat.map((item, index) => (
                        <UserInfo key={index}>
                            <StyledRowWrapper>
                                <Rank>{index + 1}</Rank>
                                <ProfileImage
                                    src={item.profileImage}
                                    alt={`Profile image of ${item.username}`}
                                    width={50}
                                    height={50}
                                />
                                <Username>{item.username}</Username>
                            </StyledRowWrapper>
                            <Link href={`/user/${index}`}>
                                <Button tertiary size="small" label="신청" />
                            </Link>
                        </UserInfo>
                    ))}
                </ColumnWrapper>
            </Container>
        </ColumnWrapper>
    );
};

export default CoffeChatList;

const StyledRowWrapper = styled(RowWrapper)`
    width: auto;
`;

const UserInfo = styled.div`
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
