'use client';
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import React from 'react';
import ShareLikeContainer from './ui/ShareLikeContainer';
import PostContainer from './ui/PostContainer';
import CommentContainer from './ui/CommentContainer';
import CommentWriteContainer from './ui/CommentWriteContainer';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { useRecoilValue } from 'recoil';
import { authDataState } from '@/entities/auth/model';

interface PostDetailProps {
    postId: string;
}

const PostDetailPage: React.FC<PostDetailProps> = ({ postId }) => {
    const authData = useRecoilValue(authDataState);
    const email = authData?.email;

    return (
        <PageWrapper gap="0.875em">
            <RowWrapper>
                <ShareLikeContainer postId={postId} email={email} />
                <ColumnWrapper gap="1.5em" alignItems="center">
                    <PostContainer postId={postId} email={email} />
                    <CommentContainer postId={postId} email={email} />
                    {email && <CommentWriteContainer postId={postId} email={email} />}
                </ColumnWrapper>
            </RowWrapper>
        </PageWrapper>
    );
};

export default PostDetailPage;
