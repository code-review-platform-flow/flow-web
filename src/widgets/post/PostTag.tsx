import React from 'react';
import styled from 'styled-components';

interface PostTagProps {
    children?: React.ReactNode
}

const PostTag: React.FC<PostTagProps> = ({ children  }) => {
    return (
        <TagContainer>
            {children}
        </TagContainer>
    );
};

export default PostTag;


const TagContainer =styled.div`
    color : #8E8E8E;
    background-color : #F5F5F5;
    padding : 0.45em 0.75em;
    font-size : 0.6875em;
    border-radius : 0.5em;
`