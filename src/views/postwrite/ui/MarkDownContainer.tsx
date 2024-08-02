import Container from '@/widgets/container/Container';
import React, { useEffect, useRef, useState } from 'react';
import { PosrtWriteTitle } from './Font';
import styled from 'styled-components';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import Image from 'next/image';
import BlockCodeIcon from '../../../../public/icons/markDownToolBar/blockCodeIcon.svg';
import BoldIcon from '../../../../public/icons/markDownToolBar/boldIcon.svg';
import CodeIcon from '../../../../public/icons/markDownToolBar/codeIcon.svg';
import HeaderIcon from '../../../../public/icons/markDownToolBar/headerIcon.svg';
import ImageIcon from '../../../../public/icons/markDownToolBar/imageIcon.svg';
import ItalicIcon from '../../../../public/icons/markDownToolBar/italicIcon.svg';
import LineIcon from '../../../../public/icons/markDownToolBar/lineIcon.svg';
import LinkIcon from '../../../../public/icons/markDownToolBar/linkIcon.svg';
import ListIcon from '../../../../public/icons/markDownToolBar/listIcon.svg';
import NumListIcon from '../../../../public/icons/markDownToolBar/numListIcon.svg';
import QuestionIcon from '../../../../public/icons/markDownToolBar/questionIcon.svg';
import QuotationIcon from '../../../../public/icons/markDownToolBar/quotationIcon.svg';
import TableIcon from '../../../../public/icons/markDownToolBar/tableIcon.svg';

interface MarkDownContainerProps {}

const MarkDownContainer: React.FC<MarkDownContainerProps> = () => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [markdownText, setMarkdownText] = useState<string>('');
    const [headerModal, setHeaderModal] = useState<boolean>(false);
    useEffect(() => {
        const textArea = textAreaRef.current;

        if (textArea) {
            const handleInput = () => {
                textArea.style.height = 'auto';
                textArea.style.height = `${textArea.scrollHeight}px`;
            };
            textArea.addEventListener('input', handleInput);

            // 초기 높이 설정
            handleInput();

            return () => {
                textArea.removeEventListener('input', handleInput);
            };
        }
    }, []);

    const insertText = (text: string, cursorOffset: number) => {
        if (textAreaRef.current) {
            const textArea = textAreaRef.current;
            const start = textArea.selectionStart;
            const end = textArea.selectionEnd;
            const before = markdownText.substring(0, start);
            const after = markdownText.substring(end, markdownText.length);

            setMarkdownText(before + text + after);

            setTimeout(() => {
                textArea.focus();
                textArea.setSelectionRange(start + cursorOffset, start + cursorOffset);
            }, 0);
        }
    };


    const handleHeaderModal = () => {
        if(headerModal){
            setHeaderModal(false);
        }else{
            setHeaderModal(true);
        }
    }
    return (
        <Container size='wide'>
            <PosrtWriteTitle>내용</PosrtWriteTitle>
            <SizedBox />
            <MarkDownWrapper size='wide' border>
                <MarkDownToolBar>
                    <ToolButton onClick={() => handleHeaderModal()}><Image src={HeaderIcon} alt="Title" /></ToolButton>
                    <ToolButton onClick={() => insertText('****', 2)}><Image src={BoldIcon} alt="Bold" /></ToolButton>
                    <ToolButton onClick={() => insertText('**', 1)}><Image src={ItalicIcon} alt="Italic" /></ToolButton>
                    <ToolButton onClick={() => insertText('``', 1)}><Image src={CodeIcon} alt="Code" /></ToolButton>
                    <ToolButton onClick={() => insertText('``````', 3)}><Image src={BlockCodeIcon} alt="BlockCode" /></ToolButton>
                    <ToolButton onClick={() => insertText('<>', 1)}><Image src={LinkIcon} alt="Link" /></ToolButton>
                    <ToolButton onClick={() => insertText('> ', 2)}><Image src={QuotationIcon} alt="Quotation" /></ToolButton>
                    <ToolButton onClick={() => alert('이미지 업로드 모달을 구현해주세요.')}><Image src={ImageIcon} alt="Image" /></ToolButton>
                    <ToolButton onClick={() => insertText('| 항목1 | 항목2 | 항목3 | 항목4 |\n|     1    |     2    |     3    |    4    |\n', 39)}><Image src={TableIcon} alt="Table" /></ToolButton>
                    <ToolButton onClick={() => insertText('1. ', 3)}><Image src={NumListIcon} alt="NumList" /></ToolButton>
                    <ToolButton onClick={() => insertText('- ', 2)}><Image src={ListIcon} alt="List" /></ToolButton>
                    <ToolButton onClick={() => insertText('--\n', 200)}><Image src={LineIcon} alt="Line" /></ToolButton>
                    <ToolButton><Image src={QuestionIcon} alt="ToolQuestion" /></ToolButton>
                </MarkDownToolBar>
                {headerModal && 
                    <HeaderModal>
                        <Header1>Heading 1</Header1>
                        <Header2>Headeing 2</Header2>
                        <Header3>Headeing 2</Header3>
                    </HeaderModal>}
                <MarkDownContent
                    ref={textAreaRef}
                    value={markdownText}
                    onChange={(e) => setMarkdownText(e.target.value)}
                    placeholder="내용을 입력하세요..."
                />
            </MarkDownWrapper>
        </Container>
    );
};

export default MarkDownContainer;

const HeaderModal = styled.div`
    border-radius: 0.875em;
    background-color : #FFFFFF;
    border : solid 1px #EDEDED;
    padding : 1em;
    display : flex;
    flex-direction : column;
    gap : 15px;
    position : absolute;
    margin-top : -1.25em;
    margin-left : 0.25em;
`

const Header1 = styled.div`
    font-weight : 600;
    font-size : 1.5625em;
`

const Header2 = styled.div`
    font-weight : 600;
    font-size : 1.125em;
`

const Header3 = styled.div`
    font-weight : 600;
    font-size : 0.8125em;
`
const MarkDownWrapper = styled(Container)`
    padding: 0;
`;

const MarkDownToolBar = styled.div`
    padding : 0.75em;
    display: flex;
    gap: 1em;
    margin-bottom: 10px;
    border-bottom : solid 1px #EDEDED;
`;

const MarkDownContent = styled.textarea`
    border-radius : 0.5em;
    font-family: 'Pretendard';
    padding: 0.75em;
    box-sizing: border-box;
    width: 100%;
    min-height: 200px;
    border: none;
    height: auto;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: #A6A6A6;
    }
    resize: none;
    @media (max-width: 768px) {
        min-height: 340px;
    }
`;

const ToolButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:focus {
        outline: none;
    }
`;
