import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@/widgets/container/Container';
import UserInfo from '@/widgets/post/UserInfo';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import PostInfo from '@/widgets/post/PostInfo';
import PostTag from '@/widgets/post/PostTag';
import ProfileExample from '../../../../public/images/profileImageExample.png';
import ShareTumbContainer from './ShareLikeContainer';
import { fetchPostDetail } from '../api/post/fetchPostDetail';
import { useQuery } from '@tanstack/react-query';
import { PostDetail } from '@/shared/type/post';
import filterTime from '@/shared/hook/filterTime';
import MarkDownContent from '@/widgets/post/MarkDownContent';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import EditContainer from './EditContainer';

interface PostContainerProps {
    postId: string;
    email: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ postId, email }) => {
    const {
        data: postDetail,
        isLoading,
        error,
    } = useQuery<PostDetail>({
        queryKey: ['postDetail', postId],
        queryFn: () => fetchPostDetail(postId, email),
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.log(error);
        return <div>오류가 발생했습니다.</div>;
    }

    if (!postDetail) return <div>데이터를 찾을 수 없습니다.</div>;

    return (
        <StyledRowWrapper justifyContent="flex-end">
            <Container width="100%" padding="1.5em" key={postDetail.postId}>
                <ColumnWrapper>
                    <PostTitle>{postDetail.title}</PostTitle>
                    <PostUser justifyContent="space-between">
                        <RowWrapper>
                            <UserInfo
                                imgUrl={postDetail.profileUrl || ProfileExample}
                                department={postDetail.majorName}
                                name={postDetail.userName}
                                enterYear={postDetail.studentNumber}
                            />
                            <ShareTumbContainer mobile postId={postId} email={email} own={postDetail.own} />
                        </RowWrapper>
                        <SizedBox height="1em" width="1em" />
                        <RowWrapper justifyContent="flex-end" alignItems="flex-end">
                            <Tags gap="0.2625em" justifyContent="flex-end">
                                {postDetail.tags &&
                                    postDetail.tags.map((tag, index) => <PostTag key={index} tag={tag.tagName} />)}
                            </Tags>

                            <ColumnWrapper width="auto" alignItems="flex-end" gap="0.5em">
                                <PostInfo
                                    isStatic
                                    tumbCount={postDetail.likeCount}
                                    commentCount={postDetail.commentsAndRepliesCount}
                                />
                                <UploadTime>{filterTime(postDetail.createDate)}</UploadTime>
                            </ColumnWrapper>
                        </RowWrapper>
                    </PostUser>
                </ColumnWrapper>
                <MarkDownContent maxHeight="100%" fontSize="1em" content={postDetail.content} />
            </Container>
            {postDetail.own && <EditContainer postId={postId} email={email} />}
        </StyledRowWrapper>
    );
};

export default PostContainer;
const StyledRowWrapper = styled(RowWrapper)`
    position: relative;
    padding: 1em;
    gap: 1em;
    width: 100%;
`;
const PostUser = styled(RowWrapper)`
    width: 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Tags = styled(RowWrapper)`
    margin-right: 1em;
    height: 100%;
    align-items: flex-end;
    @media (max-width: 768px) {
        justify-content: flex-start;
    }
`;

const PostTitle = styled.div`
    font-size: 2.5em;
    font-weight: 600;
    margin-bottom: 1em;
    white-space: pre-wrap;
    @media (max-width: 768px) {
        font-size: 2em;
    }
    @media (max-width: 480px) {
        font-size: 1.5em;
    }
`;

const UploadTime = styled.div`
    color: #8e8e8e;
    font-size: 0.75em;
    @media (max-width: 768px) {
        font-size: 0.7em;
    }
    @media (max-width: 480px) {
        font-size: 0.6em;
    }
`;
