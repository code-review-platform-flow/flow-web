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
import { getComment } from '../api/comment/getComment';
import ReplyWriteContainer, { ReplyTextArea } from './ReplyWriteContainer';
import PencilIcon from '/public/icons/pencilIcon2.svg';
import CrossIcon from '/public/icons/crossIcon2.svg';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { deleteReply } from '@/views/post-detail/api/reply/deleteReply';
import { deleteComment } from '../api/comment/deleteComment';
import { patchReply } from '../api/reply/patchReply';
import { patchComment } from '../api/comment/patchComment';
import Button from '@/widgets/button/Button';

interface CommentContainerProps {
    postId: string;
    email: string;
}

const CommentContainer: React.FC<CommentContainerProps> = ({ postId, email }) => {
    const [isClosed, setIsClosed] = useState<boolean[]>([]);
    const [commentData, setCommentData] = useState<Comment[]>([]);
    const [isEditingComment, setIsEditingComment] = useState<boolean[]>([]);
    const [isEditingReply, setIsEditingReply] = useState<{ [key: number]: boolean }>({});
    const [editedComment, setEditedComment] = useState<string[]>([]);
    const [editedReply, setEditedReply] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        async function fetchComment() {
            const response = await getComment(postId, email);
            setCommentData(response);
            setIsClosed(new Array(response.length).fill(false));
            setIsEditingComment(new Array(response.length).fill(false));
            setEditedComment(response.map((comment) => comment.commentContent));
        }
        fetchComment();
    }, [postId]);

    const toggleReplies = (index: number) => {
        setIsClosed((prev) => prev.map((item, i) => (i === index ? !item : item)));
    };

    const handleEditComment = (index: number) => {
        setIsEditingComment((prev) => prev.map((item, i) => (i === index ? !item : item)));
    };

    const handleEditReply = (commentId: number, replyId: number) => {
        setIsEditingReply((prev) => ({ ...prev, [replyId]: !prev[replyId] }));
    };

    const handleDelete = async (postId: string, commentId: number, replyId: number | null, email: string) => {
        try {
            if (replyId) {
                await deleteReply(postId, commentId, replyId, email);
                alert('답글을 삭제되었습니다');
            } else {
                await deleteComment(postId, commentId, email);
                alert('댓글을 삭제되었습니다');
            }
        } catch (error) {
            console.log(error);
        } finally {
            window.location.reload();
        }
    };

    const handleModifyReply = async (
        postId: string,
        email: string,
        commentId: number,
        replyId: number,
        replyContent: string,
    ) => {
        try {
            await patchReply(postId, commentId, replyId, email, replyContent);
            alert('답글이 수정되었습니다');
        } catch (error) {
            console.log(error);
        } finally {
            window.location.reload();
        }
    };

    const handleModifyComment = async (postId: string, commentId: number, email: string, commentContent: string) => {
        try {
            await patchComment(postId, commentId, email, commentContent);
            alert('댓글이 수정되었습니다');
        } catch (error) {
            console.log(error);
        } finally {
            window.location.reload();
        }
    };

    return (
        <>
            {commentData &&
                commentData.map((comment, index) => (
                    <Container key={comment.commentId} width="90%">
                        <ColumnWrapper justifyContent="flex-between">
                            <ColumnWrapper gap="0.75em">
                                <RowWrapper justifyContent="space-between">
                                    <UserInfo
                                        name={comment.userName}
                                        department={comment.majorName}
                                        enterYear={comment.studentNumber}
                                        imgUrl={comment.profileUrl}
                                    />
                                    {comment.own && (
                                        <>
                                            {isEditingComment[index] ? (
                                                <Button
                                                    width="15%"
                                                    tertiary
                                                    label="완료"
                                                    onClick={() =>
                                                        handleModifyComment(
                                                            postId,
                                                            comment.commentId,
                                                            email,
                                                            comment.commentContent,
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <>
                                                    <ModifyDeleteIcon
                                                        src={PencilIcon}
                                                        alt="수정"
                                                        onClick={() => handleEditComment(index)}
                                                    />
                                                    <SizedBox width="0.5em" />
                                                    <ModifyDeleteIcon
                                                        src={CrossIcon}
                                                        alt="삭제"
                                                        onClick={() =>
                                                            handleDelete(postId, comment.commentId, null, email)
                                                        }
                                                    />
                                                </>
                                            )}
                                        </>
                                    )}
                                </RowWrapper>
                                {isEditingComment[index] ? (
                                    <TextArea
                                        value={editedComment[index]}
                                        onChange={(e) =>
                                            setEditedComment((prev) =>
                                                prev.map((content, i) => (i === index ? e.target.value : content)),
                                            )
                                        }
                                    />
                                ) : (
                                    <CommentContent>{comment.commentContent}</CommentContent>
                                )}
                                <ReplyToggle onClick={() => toggleReplies(index)} gap="0.5em">
                                    {comment.replies.length > 0 ? (
                                        <ModifyDeleteIcon
                                            src={isClosed[index] ? CommentCloseIcon : CommentOpenIcon}
                                            alt="아이콘"
                                        />
                                    ) : (
                                        <ModifyDeleteIcon src={CommentOpenIcon} alt="답글 작성하기" />
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
                                        {comment.replies.length > 0 &&
                                            comment.replies.map((reply) => (
                                                <ReplyContainer key={reply.replyId}>
                                                    <RowWrapper>
                                                        <UserInfo
                                                            name={reply.userName}
                                                            department={reply.majorName}
                                                            enterYear={reply.studentNumber.toString()}
                                                            imgUrl={reply.profileUrl}
                                                        />
                                                        {reply.own && (
                                                            <>
                                                                {isEditingReply[comment.commentId, reply.replyId] ? (
                                                                    <Button
                                                                        width="15%"
                                                                        tertiary
                                                                        label="완료"
                                                                        onClick={() =>
                                                                            handleModifyReply(
                                                                                postId,
                                                                                email,
                                                                                comment.commentId,
                                                                                reply.replyId,
                                                                                reply.replyContent,
                                                                            )
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <>
                                                                        <ModifyDeleteIcon
                                                                            src={PencilIcon}
                                                                            alt="수정"
                                                                            onClick={() => handleEditReply(comment.commentId, reply.replyId)}
                                                                        />
                                                                        <SizedBox width="0.5em" />
                                                                        <ModifyDeleteIcon
                                                                            src={CrossIcon}
                                                                            alt="삭제"
                                                                            onClick={() =>
                                                                                handleDelete(
                                                                                    postId,
                                                                                    comment.commentId,
                                                                                    reply.replyId,
                                                                                    email,
                                                                                )
                                                                            }
                                                                        />
                                                                    </>
                                                                )}
                                                            </>
                                                        )}
                                                    </RowWrapper>
                                                    <SizedBox height='2em'/>
                                                    {isEditingReply[reply.replyId] ? (
                                                        <TextArea
                                                            value={editedReply[reply.replyId] || reply.replyContent}
                                                            onChange={(e) =>
                                                                setEditedReply((prev) => ({
                                                                    ...prev,
                                                                    [reply.replyId]: e.target.value,
                                                                }))
                                                            }
                                                        />
                                                    ) : (
                                                        <ReplyContent>{reply.replyContent}</ReplyContent>
                                                    )}
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

const TextArea = styled(ReplyTextArea)`
    background: #f5f5f7;
    padding: 1em;
`;
const ModifyDeleteIcon = styled(Image)`
    cursor: pointer;
`;
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
