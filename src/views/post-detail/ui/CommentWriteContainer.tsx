import Container from '@/widgets/container/Container';
import Input from '@/widgets/input/Input';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import React, { useRef, useEffect, useState } from 'react';
import CommentSendIcon from '../../../../public/icons/commentSendIcon.svg';
import styled from 'styled-components';
import { postComment } from '@/views/post-detail/api/comment/postComment';
import { useRouter } from 'next/navigation';

interface CommentWriteContainerProps {
    postId: string;
    email: string;
}

const CommentWriteContainer: React.FC<CommentWriteContainerProps> = ({ postId, email }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [commentContent, setCommentContent] = useState('');
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
        setCommentContent(event.target.value);
    };

    const submitComment = async () => {
        if (!commentContent.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        try {
            await postComment(postId, email, commentContent);
            alert('댓글이 성공적으로 등록되었습니다.');
            setCommentContent(''); // 댓글 등록 후 입력 필드 초기화
        } catch (error) {
            console.error('댓글 등록 중 오류 발생:', error);
            alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
        } finally {
            window.location.reload();
        }
    };

    return (
        <Container width="90%" height="auto">
            <RowWrapper gap="1em">
                <CommentTextArea
                    value={commentContent}
                    ref={textAreaRef}
                    onChange={handleInputChange}
                    placeholder="댓글을 작성하세요"
                />
                <Image
                    src={CommentSendIcon}
                    alt="보내기"
                    onClick={() => submitComment()}
                    style={{ cursor: 'pointer' }}
                />
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
