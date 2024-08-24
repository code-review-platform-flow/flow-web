import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../../../../public/images/profileImageExample.png';
import Image from 'next/image';
import PostInfo from '@/widgets/post/PostInfo';
import PostTag from '@/widgets/post/PostTag';
import Link from 'next/link';

const RecentPost = () => {
    const name = '지민성';
    const category = '질문';
    const department = '컴퓨터공학과';
    const enterYear = 22;
    const time = 6;
    const title = 'useState관련 질문';
    const content = '해당 코드에대해서 리뷰 부탁드려요!!';
    const tumbCount = 125;
    const commentCount = 6;
    return (
        <StyledLink href={'/postdetail'}>
            <StyledContainer size="wide">
                <ColumnWrapper gap="1em">
                    <ColumnWrapper gap="0.5em">
                        <RowWrapper gap="0.5em">
                            <Link href={'/user'}>
                                <Image width={32} src={ProfileImage} alt="예시프로필" />
                            </Link>
                            <ColumnWrapper>
                                <PostDescreption>
                                    {name}
                                    <GreyText>
                                        님이 <BlueText>{category}</BlueText>를 공유했어요.
                                    </GreyText>
                                </PostDescreption>
                                <UserInfo>
                                    {department} {enterYear}학번 약{time}시간전
                                </UserInfo>
                            </ColumnWrapper>
                        </RowWrapper>
                        <RowWrapper gap="0.75em">
                            <PostTag>React</PostTag>
                            <PostTag>Front</PostTag>
                        </RowWrapper>
                    </ColumnWrapper>

                    <PostTitle>{title}</PostTitle>
                    <PostContent>{content}</PostContent>
                </ColumnWrapper>
                <PostInfo commentCount={commentCount} tumbCount={tumbCount} />
            </StyledContainer>
        </StyledLink>
    );
};

export default RecentPost;

const StyledLink = styled(Link)`
    width: 100%;
`;

const PostTitle = styled.div`
    font-size: 1.125em;
    font-weight: 500;
`;

const PostContent = styled.div`
    font-size: 0.875em;
    color: #707070;
`;

const StyledContainer = styled(Container)`
    position: relative;
`;

const PostDescreption = styled.div`
    font-size: 0.875em;
`;

const GreyText = styled.span`
    color: #8e8e8e;
`;

const BlueText = styled.span`
    color: #004e96;
`;

const UserInfo = styled.div`
    font-size: 0.75em;
    color: #8e8e8e;
`;
