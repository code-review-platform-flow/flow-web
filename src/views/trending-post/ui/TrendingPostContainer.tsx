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

interface TrendingPostContainerProps {}

const TrendingPostContainer: React.FC<TrendingPostContainerProps> = ({}) => {
    const trendingPostData = [
        {
            title: 'KT 60만명 해킹의 심각성 : 사상 최고...',
            content:
                'KT가 60만명 가량의 자사 인터넷을 사용하는 고객 의 기기를 해킹했다는 사실이 밝혀졌습니다. 이는 사 이버 안전에 대한 심각한 위협이며 모든 이용자의 개 인정보를 위태롭게 하는 매우 중대한 사안임에 반해, 상대적으로 적은 관심을 받고 있어 이 사건의 심각성 을 재고하고자 글...',
            tags: ['React', 'Front'],
            name: '지민성',
            department: '컴퓨터공학과',
            enterYear: 22,
            time: '약 6시간 전',
            comments: 2,
            tumb: 125,
        },
        {
            title: '개인정보 유출의 위험성과 예방 방법',
            content:
                '최근 많은 기업들이 개인정보 유출 사고를 겪고 있습니다. 이러한 사고를 예방하기 위해서는 강력한 보안 체계와 사용자 교육이 필수적입니다. 이번 글에서는 개인정보 유출의 위험성과 이를 예방하는 방법에 대해 알아보겠습니다.',
            tags: ['Security', 'Privacy'],
            name: '이수현',
            department: '정보보호학과',
            enterYear: 21,
            time: '약 1일 전',
            comments: 5,
            tumb: 87,
        },
        {
            title: '사이버 보안의 미래와 도전 과제',
            content:
                '사이버 보안은 빠르게 변화하는 기술 환경 속에서 더욱 중요해지고 있습니다. 이번 글에서는 사이버 보안의 미래와 앞으로의 도전 과제에 대해 논의해 보겠습니다.',
            tags: ['Cybersecurity', 'Future'],
            name: '김영호',
            department: '컴퓨터과학과',
            enterYear: 20,
            time: '약 2일 전',
            comments: 10,
            tumb: 150,
        },
        {
            title: 'AI와 머신러닝의 미래',
            content:
                'AI와 머신러닝은 앞으로의 기술 발전을 이끌 중요한 요소들입니다. 이번 글에서는 AI와 머신러닝의 현재와 미래에 대해 논의해 보겠습니다.',
            tags: ['AI', 'Machine Learning'],
            name: '박준호',
            department: '전자공학과',
            enterYear: 21,
            time: '약 3시간 전',
            comments: 3,
            tumb: 95,
        },
        {
            title: '클라우드 컴퓨팅의 이점',
            content:
                '클라우드 컴퓨팅은 많은 기업들에게 유연성과 비용 절감의 이점을 제공합니다. 이번 글에서는 클라우드 컴퓨팅의 주요 이점과 이를 도입하는 방법에 대해 알아보겠습니다.',
            tags: ['Cloud', 'Computing'],
            name: '최민재',
            department: '정보통신학과',
            enterYear: 20,
            time: '약 5시간 전',
            comments: 7,
            tumb: 110,
        },
        {
            title: '빅데이터 분석의 중요성',
            content:
                '빅데이터 분석은 현대 비즈니스에서 매우 중요한 역할을 합니다. 이번 글에서는 빅데이터 분석의 중요성과 이를 활용하는 방법에 대해 알아보겠습니다.',
            tags: ['Big Data', 'Analysis'],
            name: '한지은',
            department: '경영학과',
            enterYear: 19,
            time: '약 4시간 전',
            comments: 4,
            tumb: 130,
        },
        {
            title: '웹 개발의 최신 동향',
            content:
                '웹 개발은 빠르게 변화하는 분야 중 하나입니다. 이번 글에서는 최신 웹 개발 동향과 이를 따르는 방법에 대해 논의해 보겠습니다.',
            tags: ['Web Development', 'Trends'],
            name: '이정민',
            department: '컴퓨터과학과',
            enterYear: 21,
            time: '약 2일 전',
            comments: 6,
            tumb: 145,
        },
        {
            title: '네트워크 보안의 중요성',
            content:
                '네트워크 보안은 현대 IT 환경에서 매우 중요한 부분입니다. 이번 글에서는 네트워크 보안의 중요성과 이를 강화하는 방법에 대해 알아보겠습니다.',
            tags: ['Network Security', 'Importance'],
            name: '김하늘',
            department: '정보보호학과',
            enterYear: 20,
            time: '약 1일 전',
            comments: 8,
            tumb: 90,
        },
        {
            title: '블록체인의 활용 사례',
            content:
                '블록체인은 다양한 산업에서 활용될 수 있는 기술입니다. 이번 글에서는 블록체인의 주요 활용 사례와 그 잠재력에 대해 알아보겠습니다.',
            tags: ['Blockchain', 'Use Cases'],
            name: '정유진',
            department: '경영학과',
            enterYear: 22,
            time: '약 6시간 전',
            comments: 12,
            tumb: 170,
        },
    ];
    return (
        <>
            {trendingPostData.map((post, index) => (
                <Container key={index} size="small" width="100%" height="300px" round animation>
                    <StyledColumnWrapper justifyContent="space-between">
                        <ColumnWrapper gap="0.5em">
                            <PostTitle>{post.title}</PostTitle>
                            <PostContent>{post.content}</PostContent>
                        </ColumnWrapper>

                        <ColumnWrapper gap="0.8125em">
                            <RowWrapper justifyContent="space-between">
                                <Tags gap="0.2625em">
                                    {post.tags.map((tag, index) => (
                                        <PostTag key={index}>{tag}</PostTag>
                                    ))}
                                </Tags>
                                <UploadTime>{post.time}</UploadTime>
                            </RowWrapper>

                            <Line />

                            <StyledRowWrapper>
                                <UserImage>
                                    <Image
                                        src={ProfileExample}
                                        alt="대체 프로필"
                                        fill
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '100px',
                                        }}
                                    />
                                </UserImage>
                                <ColumnWrapper>
                                    <UserName>{post.name}</UserName>
                                    <UserDepartmentEnterYear>
                                        {post.department} {post.enterYear}학번
                                    </UserDepartmentEnterYear>
                                </ColumnWrapper>
                                <PostInfo commentCount={post.comments} tumbCount={post.tumb} />
                            </StyledRowWrapper>
                        </ColumnWrapper>
                    </StyledColumnWrapper>
                </Container>
            ))}
        </>
    );
};

export default TrendingPostContainer;

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
