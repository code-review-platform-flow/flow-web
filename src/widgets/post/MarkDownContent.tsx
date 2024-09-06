import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // 필요에 따라 하이라이트 스타일 추가
import markdownToHtml from '@/shared/api/post/markdownToHtml'; // markdown 변환기 임포트
import styled from 'styled-components';

interface MarkDownContentProps {
    content: string; // Markdown 텍스트를 props로 받음
    fontSize: string; // 폰트 크기
    maxHeight: string; // 최대 높이
}

const MarkDownContent: React.FC<MarkDownContentProps> = ({ content, fontSize, maxHeight }) => {
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

    return <PostContent dangerouslySetInnerHTML={{ __html: htmlContent }} fontSize={fontSize} maxHeight={maxHeight} />;
};

export default MarkDownContent;

// styled-components로 동적 스타일 적용
const PostContent = styled.div<{ fontSize: string; maxHeight: string }>`
    font-size: ${(props) => props.fontSize};
    color: #000000;
    margin-bottom: 2em;
    max-height: ${(props) => props.maxHeight};
    overflow-y: hidden;
    text-overflow:  ellipsis;
    max-width: 100%; /* 부모 요소를 넘지 않도록 설정 */
    word-wrap: break-word; /* 긴 단어를 적절히 줄바꿈 */
    line-height: 3;
    padding : 1em;
    box-sizing : border-box;

    pre {
        background: #f5f5f7;
        border-box: box-sizing;
        padding: 0.5em;
        border-radius: 1em;
        max-width: 100%; 
    }

    pre > code {
    background: #f5f5f7;
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

    img {
        max-width: 100%; /* 이미지가 부모 요소를 넘지 않도록 설정 */
        height: auto;
    }
`;

const PostContentContainer = styled.div`
    margin-top: 1em;
    padding: 1em;
    line-height: 1.5;
    white-space: pre-wrap;
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
