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
    params: {
        postId: string;
    };
}

const PostPage: React.FC<PostProps> = ({params }) => {
    console.log(params)
    const  postId  = params.postId;
    console.log(postId); 
    
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