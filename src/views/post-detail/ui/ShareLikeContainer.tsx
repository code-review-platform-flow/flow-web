import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import TumbIcon from '../../../../public/icons/tumbCountIcon.svg';
import TumbColorIcon from '../../../../public/icons/tumbCountColorIcon.svg';
import { postLike } from '../api/like/postLike';
import { deleteLike } from '../api/like/deleteLike';
import { getLike } from '../api/like/getLike';
import ShareButton from './ShareButton';
import EditContainer from './EditContainer';

interface ShareLikeContainerProps {
    mobile?: boolean;
    postId: string;
    email: string;
    own?: boolean;
}

const ShareLikeContainer: React.FC<ShareLikeContainerProps> = ({ mobile = false, postId, email, own }) => {
    const [currentCliked, setCurrentCliked] = useState(false);

    const handleLike = () => {
        if (currentCliked) {
            deleteLike(postId, email!);
            setCurrentCliked(false);
        } else {
            postLike(postId, email!);
            setCurrentCliked(true);
        }
    };

    const copyUrl = () => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/post-detail/${postId}`;
        window.navigator.clipboard.writeText(url).then(() => {
            alert('링크 복사 완료');
        });
    };
    useEffect(() => {
        fetchClicked();
    }, []);

    const fetchClicked = async () => {
        try {
            const response = await getLike(postId, email);
            setCurrentCliked(response.clicked);
        } catch (error) {
            console.error('Education data fetching error:', error);
        }
    };
    return (
        <Wrapper mobile={mobile}>
            <StyledContainer mobile={mobile}>
                <TumbShareButton onClick={() => handleLike()}>
                    {currentCliked ? (
                        <ResponsiveImage src={TumbColorIcon} alt="tumb" mobile={mobile} />
                    ) : (
                        <ResponsiveImage src={TumbIcon} alt="tumb" mobile={mobile} />
                    )}
                </TumbShareButton>
                <TumbShareButton>
                    <ShareButton onClick={() => copyUrl()} />
                </TumbShareButton>
                {mobile && own && <EditContainer mobile postId={postId} email={email} />}
            </StyledContainer>
        </Wrapper>
    );
};

export default ShareLikeContainer;

const Wrapper = styled.div<{ mobile: boolean }>`
    height: 100%;
    width: ${({ mobile }) => (mobile ? 'auto' : '10%')};
    display: ${({ mobile }) => (mobile ? 'none' : 'flex')};
    @media (max-width: 1024px) {
        width: ${({ mobile }) => (mobile ? 'auto' : '15%')};
    }
    @media (max-width: 768px) {
        display: ${({ mobile }) => (mobile ? 'flex' : 'none')};
    }
    justify-content: flex-end;
`;

const StyledContainer = styled.div<{ mobile: boolean }>`
    width: auto;
    height: auto;
    padding: ${({ mobile }) => (mobile ? '0em' : '1em')};
    border-radius: 0.875em;
    background-color: #ffffff;
    position: ${({ mobile }) => (mobile ? 'static' : 'fixed')};
    top: ${({ mobile }) => (mobile ? '0' : '80px')};
    display: flex;
    flex-direction: ${({ mobile }) => (mobile ? 'row' : 'column')};
    gap: ${({ mobile }) => (mobile ? '1em' : '1em')};
`;

const TumbShareButton = styled.div`
    border-radius: 100%;
    width: 32px;
    height: 32px;
    border: 1px solid #dfe3e7;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
    }
    @media (max-width: 480px) {
        width: 24px;
        height: 24px;
    }

    cursor: pointer;
`;

const ResponsiveImage = styled(Image)<{ mobile: boolean }>`
    width: 70%;
    height: auto;

    &:hover {
        fill: #004e96;
    }

    @media (max-width: 768px) {
        width: 70%;
    }
    @media (max-width: 480px) {
        width: 50%;
    }
`;
