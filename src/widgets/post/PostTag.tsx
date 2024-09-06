import React from 'react';
import styled from 'styled-components';

interface PostTagProps {
    tag?: string
}

const PostTag: React.FC<PostTagProps> = ({ tag }) => {
    return <TagContainer>{tag}</TagContainer>;
};

export default PostTag;

const TagContainer = styled.div`
    color: #8e8e8e;
    background-color: #f5f5f5;
    padding: 0.45em 0.75em;
    font-size: 0.6875em;
    border-radius: 0.5em;
`;
