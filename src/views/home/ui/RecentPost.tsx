import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../../../../public/images/profileImageExample.png'
import CommentIcon from '../../../../public/icons/cometCountIcon.svg'
import TumbIcon from '../../../../public/icons/tumbCountIcon.svg'
import Image from 'next/image';

const RecentPost = () => {
    const name = '지민성'
    const category = '질문'
    const department = '컴퓨터공학과'
    const enterYear = 22
    const time = 6
    const title = 'useState관련 질문'
    const content = '해당 코드에대해서 리뷰 부탁드려요!!'
    const tumbCount = 125
    const commentCount = 6
    return (
        <StyledContainer size='wide'>
            <ColumnWrapper gap='1em'>
                
                <ColumnWrapper gap='0.5em'>
                    <RowWrapper gap='0.5em'>
                        <Image width={32} src={ProfileImage} alt='예시프로필'/>
                        <ColumnWrapper>
                        <PostDescreption>
                            {name}<GreyText>님이 <BlueText>{category}</BlueText>를 공유했어요.</GreyText>
                        </PostDescreption>
                        <UserInfo>
                            {department} {enterYear}학번 약{time}시간전
                        </UserInfo>
                        </ColumnWrapper>
                    </RowWrapper>
                    <RowWrapper gap='0.75em'>   
                        <TagContainer>
                            React
                        </TagContainer>
                        <TagContainer>
                            Front
                        </TagContainer>
                    </RowWrapper>
                </ColumnWrapper>

                <PostTitle>{title}</PostTitle>
                <PostContent>{content}</PostContent>
            </ColumnWrapper>
            <PostInfo>
                <RowWrapper><Image src={CommentIcon} alt='댓글수'/> {commentCount}</RowWrapper>
                <RowWrapper><Image src={TumbIcon} alt='좋아요수'/> {tumbCount}</RowWrapper>
            </PostInfo>
        </StyledContainer>
    );
};

export default RecentPost;

const PostTitle = styled.div`
    font-size: 1.125em;
    font-weight : 500;
`;

const PostContent = styled.div`
    font-size: 0.875em;
    color : #707070;
`;

const PostInfo = styled.div`
    display : flex;
    gap : 0.75em;
    align-items : center;
    position: absolute;
    bottom: 1.25em;
    right: 1.25em;
    font-size : 0.875em;
    color : #ACACAC;
`;

const StyledContainer = styled(Container)`
    position: relative;
`;


const TagContainer =styled.div`
    color : #8E8E8E;
    background-color : #F5F5F5;
    padding : 0.45em 0.75em;
    font-size : 0.6875em;
    border-radius : 0.5em;
`

const PostDescreption = styled.div`
    font-size : 0.875em;
`

const GreyText = styled.span`
    color : #8E8E8E;
`

const BlueText = styled.span`
    color : #004E96;
`

const UserInfo = styled.div`
    font-size : 0.75em;
    color : #8E8E8E;
`