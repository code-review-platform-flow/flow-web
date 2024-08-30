import Container from '@/widgets/container/Container';
import PostInfo from '@/widgets/post/PostInfo';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import React from 'react';
import styled from 'styled-components';
import ProfileExample from '../../../../public/images/profileImageExample.png';
import Image from 'next/image';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { UserDepartmentEnterYear } from '@/views/user/ui/Font';
import PostTag from '@/widgets/post/PostTag';
import { fetchTrendingPostDetails } from '../api/fetchTrendingPostList';
import { useQuery } from '@tanstack/react-query';
import { PostDetail } from '../../../shared/type/post/type'; // PostDetail 타입을 임포트
import { useRouter } from 'next/navigation';
import filterTime from '@/shared/hook/filterTime';

interface TrendingPostContainerProps {}

const TrendingPostContainer: React.FC<TrendingPostContainerProps> = ({}) => {
    // 페이지 번호와 개수를 정의합니다.
    const page = 1;
    const count = 10;

    const router = useRouter()

    const { data: trendingPostList = [], isLoading, error } = useQuery<PostDetail[]>({
        queryKey: ['trendingPostList', page, count],
        queryFn: () => fetchTrendingPostDetails(),  
    });


    if (isLoading) return <div>Loading...</div>;
    if (error) {
        console.log(error);
        return <div>오류가 발생했습니다.</div>;
    }


    
    return (
        <>
            {trendingPostList.map((post, index) => (
                <PostContainer 
                    onClick={()=>router.push(`/post-detail/${post.postId}`)}
                    key={index} size="small" width="100%" height="300px" round animation>
                    <StyledColumnWrapper justifyContent="space-between">
                        <ColumnWrapper gap="0.5em">
                            <PostTitle>{post.title}</PostTitle>
                            <PostContent>{post.content}</PostContent>
                        </ColumnWrapper>

                        <ColumnWrapper gap="0.8125em">
                            <RowWrapper justifyContent="space-between">
                                <Tags gap="0.2625em">
                                    {post.tags.map((tag, index) => (
                                        <PostTag key={index}>{tag.tagName}</PostTag>
                                    ))}
                                </Tags>
                                <UploadTime>{filterTime(post.createDate)}</UploadTime>
                            </RowWrapper>

                            <Line />

                            <StyledRowWrapper>
                                <UserImage>
                                    <Image
                                        src={post.profileUrl || ProfileExample}
                                        alt="프로필 이미지"
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '100px',
                                        }}
                                    />
                                </UserImage>
                                <ColumnWrapper>
                                    <UserName>{post.userName}</UserName>
                                    <UserDepartmentEnterYear>
                                        {post.majorName} {post.studentNumber ? `${String(post.studentNumber).substring(0, 2)}학번` : ''}
                                    </UserDepartmentEnterYear>
                                </ColumnWrapper>
                                <PostInfo commentCount={0} tumbCount={ 0} />
                            </StyledRowWrapper>
                        </ColumnWrapper>
                    </StyledColumnWrapper>
                </PostContainer>
            ))}
        </>
    );
};

export default TrendingPostContainer;

const PostContainer = styled(Container)`
    max-width: 31%;
    width : 100%;
    min-height: 300px;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const Tags = styled(RowWrapper)`
    width: auto;
    max-width: 80%;
`;

const StyledRowWrapper = styled(RowWrapper)`
    position: relative;
`;

const StyledColumnWrapper = styled(ColumnWrapper)`
    height: 100%;
`;

const UserImage = styled.div`
    position: relative;
    width: 50px;
    height: 45px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 0.5em;
`;

const PostTitle = styled.div`
    width : 100%;
    font-size: 1.125em;
    color: #333333;
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: 768px) {
        -webkit-line-clamp: 2;
        white-space: normal;
    }

    @media (max-width: 480px) {
        -webkit-line-clamp: 1;
        white-space: nowrap;
    }
`;

const PostContent = styled.div`
    color: #707070;
    font-size: 1em;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 768px) {
        -webkit-line-clamp: 4;
    }

    @media (max-width: 480px) {
        -webkit-line-clamp: 2;
        margin-bottom: 1em;
    }
`;

const Line = styled.div`
    width: 100%;
    background-color: #d9d9d9;
    height: 1px;
`;

const UploadTime = styled.div`
    color: #8e8e8e;
    font-size: 0.75em;
`;

const UserName = styled.div`
    font-size: 0.875em;
`;
