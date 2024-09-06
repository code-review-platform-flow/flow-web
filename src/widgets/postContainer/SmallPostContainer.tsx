import React, { useEffect, useState } from 'react';
import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import styled from 'styled-components';
import Image from 'next/image';
import PostInfo from '@/widgets/post/PostInfo';
import PostTag from '@/widgets/post/PostTag';
import Link from 'next/link';
import { PostDetail } from '@/shared/type/post';
import filterTime from '@/shared/hook/filterTime';
import { formatEnterYear } from '@/shared/hook/formatEnterYear';
import { SizedBox } from '../wrapper/SizedBox';
import markdownToHtml from '@/shared/api/post/markdownToHtml';
import hljs from 'highlight.js';

interface SmallPostContainerProps {
    postData: PostDetail;
}

const SmallPostContainer: React.FC<SmallPostContainerProps> = ({ postData }) => {
    const [content, setContent] = useState<string>(''); // 변환된 HTML을 저장할 상태

    // Markdown을 HTML로 변환하는 비동기 함수 실행
    useEffect(() => {
        if (postData?.content) {
            markdownToHtml(postData.content).then((htmlContent) => {
                setContent(htmlContent); // 변환된 HTML을 상태에 저장
            });
        }
    }, [postData?.content]);

    // HTML content가 변경될 때 하이라이트 적용
    useEffect(() => {
        if (content) {
            const codeBlocks = document.querySelectorAll('pre code');
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block as HTMLElement); // 코드 블록 하이라이팅 적용
            });
        }
    }, [content]);
    return (
        <>
            {' '}
            <StyledLink href={`/post-detail/${postData.postId}`}>
                <StyledContainer size="wide">
                    <ColumnWrapper gap="1em">
                        <ColumnWrapper gap="0.5em">
                            <RowWrapper gap="0.5em">
                                <Link href={'/user'}>
                                    <Image
                                        width={32}
                                        height={32}
                                        style={{ borderRadius: '0.5em' }}
                                        src={postData.profileUrl}
                                        alt="예시프로필"
                                    />
                                </Link>
                                <ColumnWrapper justifyContent="center" gap="0.1em">
                                    <PostDescreption>
                                        {postData.userName}
                                        <GreyText>
                                            님이 <BlueText>{postData.categoryName}</BlueText>를 공유했어요.
                                        </GreyText>
                                    </PostDescreption>
                                    <UserInfo>
                                        {postData.majorName} {formatEnterYear(postData.studentNumber)}{' '}
                                        {filterTime(postData.createDate)}
                                    </UserInfo>
                                </ColumnWrapper>
                            </RowWrapper>
                            <RowWrapper gap="0.75em">
                                
                                {postData.tags &&
                                    postData.tags.map((tag, index) => <PostTag key={index} tag={tag.tagName}></PostTag>)}
                            </RowWrapper>
                        </ColumnWrapper>

                        <PostTitle>{postData.title}</PostTitle>
                        <PostContent dangerouslySetInnerHTML={{ __html: content }} />
                    </ColumnWrapper>
                </StyledContainer>
            </StyledLink>
        </>
    );
};

export default SmallPostContainer;

const StyledLink = styled(Link)`
    width: 100%;
`;

const PostTitle = styled.div`
    font-size: 1.125em;
    font-weight: 500;
`;

const PostContent = styled.div`
    font-size: 0.5em;
    color: #707070;
    margin-bottom: 2em;
    line-height: 2;
    max-height: 30px;
    overflow-y: hidden;
    cursor: pointer;
    text-overflow: ellipsis;

    pre {
        background: #f5f5f7;
        border-box: box-sizing;
        padding: 0.5em;
        border-radius: 1em;
    }
    pre > code {
        max-height: 300px; /* 원하는 최대 높이로 설정 */
        overflow-y: auto; /* 필요시 스크롤바 추가 */
        white-space: pre-wrap; /* 코드 줄바꿈 허용 */
        word-wrap: break-word; /* 단어가 너무 길면 줄바꿈 */
    }

    p > code {
        box-sizing: border-box;
        padding: 0.25em;
        border-radius: 0.25em;
        color: #f54735;
        background-color: #b4b4b4;
        white-space: pre-wrap; /* 코드 줄바꿈 허용 */
        word-wrap: break-word; /* 단어가 너무 길면 줄바꿈 */
    }
`;

const StyledContainer = styled(Container)`
    position: relative;
`;

const PostDescreption = styled.div`
    font-size: 0.875em;
`;

const GreyText = styled.span`
    color: #8e8e8e;
`;

const BlueText = styled.span`
    color: #004e96;
`;

const UserInfo = styled.div`
    font-size: 0.75em;
    color: #8e8e8e;
`;
