'use client'
import { PageWrapper } from '@/widgets/wrapper/PageWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import React from 'react';
import ShareTumbContainer from './ui/ShareTumbContainer';
import PostContainer from './ui/PostContainer';
import CommentContainer from './ui/CommentContainer';
import CommentWriteContainer from './ui/CommentWriteContainer';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';


interface PostProps {
    params: string
}

const PostPage: React.FC<PostProps> = ({params }) => {
    console.log({ params })
    return (
        <PageWrapper gap="0.875em">
            <RowWrapper>
                <ShareTumbContainer/>
                
                <ColumnWrapper gap='1.5em'>
                    <PostContainer/>
                    <CommentContainer/>
                    <CommentWriteContainer/>
                </ColumnWrapper>
                
            </RowWrapper>
            
        </PageWrapper>
    );
};

export default PostPage;