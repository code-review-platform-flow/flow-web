import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import React from 'react';
import styled from 'styled-components';
import { Medium } from './Font';
import Container from '@/widgets/container/Container';
import Button from '@/widgets/button/Button';
import Image from 'next/image';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PostDetail } from '@/shared/type/post';


interface TrendingPostListProps {
    trendingPostList?: PostDetail[];
}

const TrendingPostList: React.FC<TrendingPostListProps> = ({ trendingPostList = [] }) => {
    const router = useRouter();

    return (
        <ColumnWrapper gap="0.75em">
            <Medium>️🔥 트렌딩 포스트</Medium>
            <Container size="small" width="100%" height="100%">
                <ColumnWrapper gap="1.25em">
                    {trendingPostList && trendingPostList.map((post, index) => (
                        <UserInfo key={index} onClick={()=>router.push(`/post-detail/${post.postId}`)}>
                            <Rank>{index+1}</Rank>
                            <ColumnWrapper gap="0.25em">
                                <RowWrapper>
                                    <ProfileImage
                                        src={post.profileUrl}
                                        alt={`Profile image of ${post.userName}`}
                                        width={50}
                                        height={50}
                                    />
                                    <Username>{post.userName}</Username>
                                </RowWrapper>
                                <PostTitle>{post.title}</PostTitle>
                            </ColumnWrapper>
                        </UserInfo>
                    ))}
                </ColumnWrapper>
                <Link href={'/trending-post'}>
                    <Button tertiary label="더보기" size="wide" />
                </Link>
            </Container>
        </ColumnWrapper>
    );
};

export default TrendingPostList;

const UserInfo = styled.div`
    cursor : pointer;
    display: flex;
    align-items: start;
    margin-bottom: 0.5em;

    &:last-child {
        margin-bottom: 1.5em;
    }
`;

const Rank = styled.div`
    font-size: 0.875em;
    color: #8e8e8e;
    width: 1em;
`;

const ProfileImage = styled(Image)`
    border-radius: 100%;
    margin-right: 0.5em;
    width: 1.25em;
    height: 1.25em;
`;

const Username = styled.div`
    font-size: 0.8125em;
`;

const PostTitle = styled.div`
    font-size: 0.9375em;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 25ch;
`;
