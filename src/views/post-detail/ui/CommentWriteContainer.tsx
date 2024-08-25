import Container from '@/widgets/container/Container';
import Input from '@/widgets/input/Input';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import CommentSendIcon from '../../../../public/icons/commentSendIcon.svg';
import styled from 'styled-components';

interface CommentWriteContainerProps {}

const CommentWriteContainer: React.FC<CommentWriteContainerProps> = ({}) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textArea = textAreaRef.current;
        if (textArea) {
            const adjustHeight = () => {
                textArea.style.height = 'auto';
                textArea.style.height = `${textArea.scrollHeight}px`;
            };
            textArea.addEventListener('input', adjustHeight);
            return () => {
                textArea.removeEventListener('input', adjustHeight);
            };
        }
    }, []);

    return (
        <Container width="90%" height="auto">
            <RowWrapper gap="1em">
                <CommentTextArea ref={textAreaRef} placeholder="댓글을 작성하세요" />
                <Image src={CommentSendIcon} alt="보내기" />
            </RowWrapper>
        </Container>
    );
};

export default CommentWriteContainer;

const CommentTextArea = styled.textarea`
    resize: none;
    border: none;
    font-size: 1.125em;
    font-family: 'Pretendard';
    background-color: #f5f5f7;
    border-radius: 10px;
    width: 100%;
    height: auto;
    padding: 1em;
    box-sizing: border-box;
    &:focus {
        outline: none;
    }
    &::placeholder {
        color: #acacac;
    }
`;
