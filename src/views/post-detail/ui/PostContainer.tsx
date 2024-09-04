import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@/widgets/container/Container';
import UserInfo from '@/widgets/post/UserInfo';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import PostInfo from '@/widgets/post/PostInfo';
import PostTag from '@/widgets/post/PostTag';
import ProfileExample from '../../../../public/images/profileImageExample.png';
import ShareTumbContainer from './ShareTumbContainer';
import { fetchPostDetail } from '../api/fetchPostDetail';
import { useQuery } from '@tanstack/react-query';
import { PostDetail } from '@/shared/type/post';
import filterTime from '@/shared/hook/filterTime';
import markdownToHtml from './markdownToHtml';

interface PostContainerProps {
    postId: string;
}

const PostContainer: React.FC<PostContainerProps> = ({ postId }) => {
    // 상태 정의: 변환된 HTML 내용을 저장
    const [content, setContent] = useState<string>('');

    // useQuery로 데이터 가져오기
    const {
        data: postDetail,
        isLoading,
        error,
    } = useQuery<PostDetail>({
        queryKey: ['postDetail', postId],
        queryFn: () => fetchPostDetail(postId),
    });

    // Markdown을 HTML로 변환하는 비동기 함수 실행
    useEffect(() => {
        if (postDetail?.content) {
            markdownToHtml(postDetail.content).then((htmlContent) => {
                setContent(htmlContent);
            });
        }
    }, [postDetail?.content]);

    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.log(error);
        return <div>오류가 발생했습니다.</div>;
    }

    if (!postDetail) return <div>데이터를 찾을 수 없습니다.</div>;

    return (
        <Container width="90%" padding="1.5em" key={postDetail.postId}>
            <ColumnWrapper>
                <PostTitle>{postDetail.title}</PostTitle>
                <PostUser justifyContent="space-between">
                    <UserInfo
                        imgUrl={postDetail.profileUrl || ProfileExample}
                        department={postDetail.majorName}
                        name={postDetail.userName}
                        enterYear={postDetail.studentNumber}
                    />
                    <RowWrapper justifyContent="flex-end" alignItems="flex-end">
                        <Tags gap="0.2625em" justifyContent="flex-end">
                            {postDetail.tags.map((tag, index) => (
                                <PostTag key={index}>{tag.tagName}</PostTag>
                            ))}
                        </Tags>
                        <ShareTumbContainer mobile />
                        <ColumnWrapper width="auto" alignItems="flex-end" gap="0.5em">
                            <PostInfo isStatic tumbCount={0} commentCount={0} />
                            <UploadTime>{filterTime(postDetail.createDate)}</UploadTime>
                        </ColumnWrapper>
                    </RowWrapper>
                </PostUser>
            </ColumnWrapper>
            <PostContentContainer>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </PostContentContainer>
        </Container>
    );
};

export default PostContainer;

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

const PostContentContainer = styled.div`
    margin-top: 1em;
    padding : 1em;
    line-height: 1.5;
    white-space: pre-wrap;
`;
