import React, { useState } from 'react';
import Container from '@/widgets/container/Container';
import UserInfo from '@/widgets/post/UserInfo';
import ProfileExample from '../../../../public/images/profileImageExample.png';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import styled from 'styled-components';
import CommentOpenIcon from '../../../../public/icons/commentOpenIcon.svg';
import CommentCloseIcon from '../../../../public/icons/commentCloseIcon.svg';
import Image from 'next/image';

interface CommentContainerProps {}

const CommentContainer: React.FC<CommentContainerProps> = ({}) => {
    const [isClosed, setIsClosed] = useState(true);
    const [isReply, setIsReply] = useState(true);

    const commentData = {
        commentId: 1,
        commentUser: '지민성',
        commentContent: '심각한 사안이네요 어쩌고 저쩌고',
        department: '컴퓨터공학과',
        enterYear: 22,
        reply: [
            {
                replyId: 1,
                replyUser: '지민성',
                department: '컴퓨터공학과',
                enterYear: 22,
                replyContent: '심각한 사안이네요 어쩌고 저쩌고',
            },
            {
                replyId: 2,
                replyUser: '지민성',
                department: '컴퓨터공학과',
                enterYear: 22,
                replyContent: '심각한 사안이네요 어쩌고 저쩌고',
            },
        ],
    };

    const toggleReplies = () => {
        setIsClosed(!isClosed);
    };

    return (
        <Container width="90%">
            <ColumnWrapper justifyContent="flex-between">
                <ColumnWrapper gap="0.75em">
                    <RowWrapper>
                        <UserInfo
                            name={commentData.commentUser}
                            department={commentData.department}
                            enterYear={commentData.enterYear.toString()}
                            imgUrl={ProfileExample}
                        />
                    </RowWrapper>
                    <CommentContent>{commentData.commentContent}</CommentContent>
                    <RowWrapper gap="0.5em">
                        <Image
                            src={isClosed ? CommentOpenIcon : CommentCloseIcon}
                            alt={isClosed ? '댓글 열기' : '댓글 숨기기'}
                            onClick={toggleReplies}
                        />
                        {isReply && (
                            <OpenClose>{isClosed ? `${commentData.reply.length}개의 답글` : '숨기기'}</OpenClose>
                        )}
                    </RowWrapper>
                </ColumnWrapper>
                {!isClosed && (
                    <ReplyList>
                        {commentData.reply.map((reply) => (
                            <ReplyContainer key={reply.replyId}>
                                <UserInfo
                                    name={reply.replyUser}
                                    department={reply.department}
                                    enterYear={reply.enterYear.toString()}
                                    imgUrl={ProfileExample}
                                />
                                <ReplyContent>{reply.replyContent}</ReplyContent>
                                <Line />
                            </ReplyContainer>
                        ))}
                    </ReplyList>
                )}
            </ColumnWrapper>
        </Container>
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
