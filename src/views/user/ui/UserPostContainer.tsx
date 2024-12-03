import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { UserDepartmentEnterYear } from './Font';
import PostInfo from '@/widgets/post/PostInfo';
import styled from 'styled-components';
import Container from '@/widgets/container/Container';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { formatEnterYear } from '@/shared/hook/formatEnterYear';
import filterTime from '@/shared/hook/filterTime';
import filterTime2 from '@/shared/hook/filterTime2';
import markdownToHtml from '@/shared/api/post/markdownToHtml';
import { useRouter } from 'next/navigation';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

interface UserPostContainerProps {
    id: number;
    createDate: string;
    userName: string;
    title: string;
    content: string;
    majorName: string;
    commentCount: number;
    likeCount: number;
    profileUrl: string;
    studentNumber: string;
}

const UserPostContainer: React.FC<UserPostContainerProps> = ({
    id,
    createDate,
    userName,
    title,
    content,
    majorName,
    profileUrl,
    studentNumber,
    likeCount,
    commentCount,
}) => {
    const router = useRouter();

    const [htmlContent, setHtmlContent] = useState<string>('');

    // Markdown을 HTML로 변환하는 비동기 함수 실행
    useEffect(() => {
        if (content) {
            markdownToHtml(content).then((convertedContent) => {
                setHtmlContent(convertedContent);
            });
        }
    }, [content]);

    // HTML content가 변경될 때 하이라이트 적용
    useEffect(() => {
        if (htmlContent) {
            const codeBlocks = document.querySelectorAll('pre code');
            codeBlocks.forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    }, [htmlContent]);
    return (
        <>
            <RowWrapper gap="0.35em" alignItems="start">
                <PostDate>{filterTime2(createDate)}</PostDate>
                <SizedBox height="100%" width="1em" />
                <Line />
                <Image style={{ borderRadius: '1em' }} src={profileUrl} alt="User Image" width={50} height={50} />
                <PostUserContainer>
                    <RowWrapper gap="0.5em">
                        <ColumnWrapper gap="0.275em">
                            <UserName>{userName}</UserName>
                            <RowWrapper gap="1em">
                                <UserDepartmentEnterYear>
                                    {majorName} {formatEnterYear(studentNumber)}
                                </UserDepartmentEnterYear>
                                <UploadTime>약 {filterTime(createDate)}</UploadTime>
                            </RowWrapper>
                        </ColumnWrapper>
                    </RowWrapper>
                    <SizedBox height="0.75em" />
                    <PostContainer onClick={() => router.push(`/post-detail/${id}`)} round>
                        <PostTitle>{title}</PostTitle>
                        <PostContent dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        <PostInfo commentCount={commentCount} tumbCount={likeCount} />
                    </PostContainer>
                </PostUserContainer>
            </RowWrapper>
        </>
    );
};

export default UserPostContainer;

const PostContainer = styled(Container)`
    position: relative;
`;

const PostDate = styled.div`
    font-size: 0.75em;
    color: #8e8e8e;
`;

const Line = styled.div`
    width: 3px;
    height: 100%;
    background-color: #eaeaec;
`;

const PostUserContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    box-sizing: border-box;
`;

const UserName = styled.div`
    font-weight: 500;
`;

const UploadTime = styled.div`
    font-size: 0.75em;
    color: #8e8e8e;
`;

const PostTitle = styled.div`
    font-size: 1.125em;
    font-weight: 500;
    margin-bottom: 10px;
`;

const PostContent = styled.div`
    font-size: 0.75em;
    color: #707070;
    margin-bottom: 2em;
    line-height: 2;
    max-height: 500px;
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
