import React from 'react';
import { RowWrapper } from '../wrapper/RowWrapper';
import styled from 'styled-components';
import Image from 'next/image';
import CommentIcon from '../../../public/icons/cometCountIcon.svg';
import TumbIcon from '../../../public/icons/tumbCountIcon.svg';

interface PostInfoProps {
    commentCount: number;
    tumbCount: number;
    isStatic?: boolean;
}

const PostInfo: React.FC<PostInfoProps> = ({ commentCount, tumbCount, isStatic }) => {
    return (
        <PostInfoWrapper isStatic={isStatic ?? false}>
            <RowWrapper>
                <Image src={CommentIcon} alt="댓글수" /> {commentCount}
            </RowWrapper>
            <RowWrapper>
                <Image src={TumbIcon} alt="좋아요수" /> {tumbCount}
            </RowWrapper>
        </PostInfoWrapper>
    );
};

export default PostInfo;

const PostInfoWrapper = styled.div<{ isStatic: boolean }>`
    display: flex;
    gap: 0.75em;
    align-items: center;
    position: ${(props) => (props.isStatic ? 'static' : 'absolute')};
    bottom: 1.25em;
    right: 1.25em;
    font-size: 0.875em;
    color: #acacac;
`;
