import React from 'react';
import styled from 'styled-components';
import { deletePost } from '../api/post/deletePost';
import DeleteButton from './DeleteButton';

interface DeleteContainerProps {
    mobile?: boolean;
    postId: string;
    email?: string;
}

const DeleteContainer: React.FC<DeleteContainerProps> = ({ postId, email, mobile = false }) => {
    const handleDelete = async () => {
        try {
            const response = await deletePost(postId, email!);
            console.log('Post deleted successfully:', response);
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <Wrapper mobile={mobile}>
            <StyledContainer mobile={mobile}>
                <DeleteButton
                    width={32}
                    height={32}
                    color="#ACACAC"
                    hoverColor="#004E96"
                    onClick={() => handleDelete()}
                />
            </StyledContainer>
        </Wrapper>
    );
};

export default DeleteContainer;

const Wrapper = styled.div<{ mobile: boolean }>`
    height: 100%;
    position: ${({ mobile }) => (mobile ? 'relative' : '')};
    display: ${({ mobile }) => (mobile ? 'none' : 'flex')};
    @media (max-width: 1024px) {
        width: ${({ mobile }) => (mobile ? 'auto' : '15%')};
    }
    @media (max-width: 768px) {
        display: ${({ mobile }) => (mobile ? 'flex' : 'none')};
    }
`;

const StyledContainer = styled.div<{ mobile: boolean }>`
    padding: ${({ mobile }) => (mobile ? '0em' : '1em')};
    border-radius: 0.875em;
    background-color: #ffffff;
    position: ${({ mobile }) => (mobile ? 'static' : 'fixed')};
    top: ${({ mobile }) => (mobile ? '0' : '160px')};
    display: flex;
    flex-direction: ${({ mobile }) => (mobile ? 'row' : 'column')};
    gap: ${({ mobile }) => (mobile ? '0.5em' : '1em')};
`;
