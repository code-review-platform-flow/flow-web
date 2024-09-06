import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import ReplySendIcon from '../../../../public/icons/commentSendIcon.svg';
import styled from 'styled-components';
import { postReply } from '../api/reply/postReply';
import { useRouter } from 'next/navigation';

interface ReplyWriteContainerrProps {
    postId: string;
    commentId: number;
    email: string;
}

const ReplyWriteContainer: React.FC<ReplyWriteContainerrProps> = ({ postId, commentId, email }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [replyContent, setReplyContent] = useState('');
    const router = useRouter();

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

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReplyContent(event.target.value);
    };

    const submitReply = async () => {
        if (!replyContent.trim()) {
            alert('답글 내용을 입력해주세요.');
            return;
        }
        try {
            await postReply(postId, commentId, email, replyContent);
            alert('답글이 성공적으로 등록되었습니다.');
            setReplyContent(''); // 댓글 등록 후 입력 필드 초기화
        } catch (error) {
            console.error('답글 등록 중 오류 발생:', error);
            alert('답글ㄴ 등록에 실패했습니다. 다시 시도해주세요.');
        } finally {
            window.location.reload();
        }
    };

    return (
        <RowWrapper gap="1em">
            <ReplyTextArea
                value={replyContent}
                ref={textAreaRef}
                onChange={handleInputChange}
                placeholder="답글을 작성하세요"
            />
            <Image src={ReplySendIcon} alt="보내기" onClick={() => submitReply()} style={{ cursor: 'pointer' }} />
        </RowWrapper>
    );
};

export default ReplyWriteContainer;

const ReplyTextArea = styled.textarea`
    resize: none;
    border: none;
    font-size: 1.125em;
    font-family: 'Pretendard';
    background-color: #FFFFFF;
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
