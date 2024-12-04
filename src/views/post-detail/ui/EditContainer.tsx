import React from 'react';
import styled from 'styled-components';
import EditButton from './EditButton';
import { useRouter } from 'next/navigation';

interface EditContainerProps {
    mobile?: boolean;
    postId: string;
    email: string;
}

const EditContainer: React.FC<EditContainerProps> = ({ postId, mobile = false }) => {
    const router = useRouter();
    const handleEdit = () => {
        router.push(`/post-write?postId=${postId}`);
    };

    return (
        <Wrapper mobile={mobile}>
            <StyledContainer mobile={mobile}>
                <EditButton width={32} height={32} color="#ACACAC" hoverColor="#004E96" onClick={() => handleEdit()} />
            </StyledContainer>
        </Wrapper>
    );
};

export default EditContainer;

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
    top: ${({ mobile }) => (mobile ? '0' : '80px')};
    display: flex;
    flex-direction: ${({ mobile }) => (mobile ? 'row' : 'column')};
    gap: ${({ mobile }) => (mobile ? '0.5em' : '1em')};
`;
