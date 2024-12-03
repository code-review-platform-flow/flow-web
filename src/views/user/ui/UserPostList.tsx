import { getPostDetail } from '@/shared/api/post/getPostDetail';
import { PostDetail, PostSummary } from '@/shared/type/post';
import React, { useEffect, useState } from 'react';
import UserPostContainer from './UserPostContainer';
import styled from 'styled-components';

// props 인터페이스 정의
interface UserPostListProps {
    postList: PostSummary[]; // 포스트 목록
    own: boolean;
}

const UserPostList: React.FC<UserPostListProps> = ({ postList, own }) => {
    const [postData, setPostData] = useState<PostDetail[]>([]);

    useEffect(() => {
        const fetchPostData = async () => {
            console.log('포스트 정보 불러오기');
            try {
                const data = await Promise.all(postList.map((post) => getPostDetail(post.postId)));
                setPostData(data);
                console.log(data);
            } catch (error) {
                console.error('Post data fetching error:', error);
            }
        };

        fetchPostData();
    }, [postList]);

    return (
        <PostListWrapper>
            {postData.map((postDetail, index) => (
                <UserPostContainer
                    commentCount={postDetail.commentsAndRepliesCount}
                    likeCount={postDetail.likeCount}
                    id={postDetail.postId}
                    key={index}
                    createDate={postDetail.createDate}
                    userName={postDetail.userName}
                    title={postDetail.title}
                    content={postDetail.content}
                    majorName={postDetail.majorName}
                    profileUrl={postDetail.profileUrl}
                    studentNumber={postDetail.studentNumber}
                />
            ))}
        </PostListWrapper>
    );
};

export default UserPostList;

const PostListWrapper = styled.div`
    width: 100%;
`;
