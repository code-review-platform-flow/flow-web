import React, { useEffect, useState } from 'react';
import Container from '@/widgets/container/Container';
import UserInfo from '@/widgets/post/UserInfo';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import styled from 'styled-components';
import CommentOpenIcon from '../../../../public/icons/commentOpenIcon.svg';
import CommentCloseIcon from '../../../../public/icons/commentCloseIcon.svg';
import Image from 'next/image';
import { Comment, Reply } from '@/shared/type/post';
import { getComment } from '../api/getComment';
import Input from '@/widgets/input/Input';
import ReplyWriteContainer from './ReplyWriteContainer';

interface CommentContainerProps {
    postId: string;
    email: string;
}

const CommentContainer: React.FC<CommentContainerProps> = ({ postId, email }) => {
    const [isClosed, setIsClosed] = useState<boolean[]>([]);
    const [newReply, setNewReply] = useState<Reply>();
    const [commentData, setCommentData] = useState<Comment[]>([]);

    useEffect(() => {
        async function fetchComment() {
            const response = await getComment(postId);
            console.log(response);
            setCommentData(response);

            // 각 댓글에 대한 초기 상태 설정 (모두 닫힘)
            setIsClosed(new Array(response.length).fill(false));
        }
        fetchComment();
    }, [postId]);

    const toggleReplies = (index: number) => {
        setIsClosed(
            (prev) => prev.map((item, i) => (i === index ? !item : item)), // 해당 index의 상태만 토글
        );
    };

    return (
        <>
            {commentData &&
                commentData.map((comment, index) => (
                    <Container key={comment.commentId} width="90%">
                        <ColumnWrapper justifyContent="flex-between">
                            <ColumnWrapper gap="0.75em">
                                <RowWrapper>
                                    <UserInfo
                                        name={comment.userName}
                                        department={comment.majorName}
                                        enterYear={comment.studentNumber}
                                        imgUrl={comment.profileUrl}
                                    />
                                </RowWrapper>
                                <CommentContent>{comment.commentContent}</CommentContent>
                                <ReplyToggle
                                    onClick={() => {
                                        console.log(index);
                                        toggleReplies(index);
                                    }}
                                    gap="0.5em"
                                >
                                    {comment.replies.length > 0 ? (
                                        <Image
                                            src={isClosed[index] ? CommentCloseIcon : CommentOpenIcon}
                                            alt="아이콘"
                                        />
                                    ) : (
                                        <Image src={CommentOpenIcon} alt={'답글 작성하기'} />
                                    )}
                                    {comment.replies.length > 0 ? (
                                        <OpenClose>
                                            {isClosed[index] ? '숨기기' : `${comment.replies.length}개의 답글`}
                                        </OpenClose>
                                    ) : (
                                        <OpenClose>답글 작성하기</OpenClose>
                                    )}
                                </ReplyToggle>
                            </ColumnWrapper>
                            {isClosed[index] && (
                                <>
                                    <ReplyList>
                                        {' '}
                                        {/* 답글 리스트 */}
                                        {comment.replies.length > 0 &&
                                            comment.replies.map((reply) => (
                                                <ReplyContainer key={reply.replyId}>
                                                    <UserInfo
                                                        name={reply.userName}
                                                        department={reply.majorName}
                                                        enterYear={reply.studentNumber.toString()}
                                                        imgUrl={reply.profileUrl}
                                                    />
                                                    <ReplyContent>{reply.replyContent}</ReplyContent>
                                                    <Line />
                                                </ReplyContainer>
                                            ))}
                                        <ReplyWriteContainer
                                            postId={postId}
                                            commentId={comment.commentId}
                                            email={email}
                                        />
                                    </ReplyList>
                                </>
                            )}
                        </ColumnWrapper>
                    </Container>
                ))}
        </>
    );
};

export default CommentContainer;
const Line = styled.div`
    width: 100%;
    height: 1px;
    background-color: #d9d9d9;
    margin-top: 1em;
`;
const CommentContent = styled.div`
    font-size: 1.125em;
    padding: 0.5em 0;
`;

const ReplyList = styled.div`
    width: 100%;
    height: 100%;
    background-color: #efeff2;
    padding: 1em;
    margin-top: 1em;
    margin-bottom: -1em;
    width: calc(100% + 1em * 2);
    margin: 1em 0 -1em -1em;
    border-bottom-left-radius: 0.875em;
    border-bottom-right-radius: 0.875em;
`;

const OpenClose = styled.span`
    font-size: 0.8125em;
    color: #004e96;
`;
const ReplyContainer = styled.div`
    margin-bottom: 1em;
    padding: 0.5em;
`;

const ReplyContent = styled.div`
    font-size: 1em;
    margin-top: 0.5em;
`;

const ReplyToggle = styled(RowWrapper)`
    cursor: pointer;
`;
