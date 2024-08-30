import React from 'react'
import PostDetailPage from '@/views/post-detail';

type Props = {
    params: {
        id: number;
    };
};

export default function Post({ params }: Props) {
    return (
            <PostDetailPage postId={params.id}/>
    );
}
