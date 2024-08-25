import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import TumbIcon from '../../../../public/icons/tumbCountIcon.svg';
import ShareIcon from '../../../../public/icons/shareIcon.svg';
import { SizedBox } from '@/widgets/wrapper/SizedBox';

interface ShareTumbContainerProps {
    mobile?: boolean;
}

const ShareTumbContainer: React.FC<ShareTumbContainerProps> = ({ mobile = false }) => {
    return (
        <Wrapper mobile={mobile}>
            <StyledContainer mobile={mobile}>
                <TumbShareButton>
                    <ResponsiveImage src={TumbIcon} alt="tumb" mobile={mobile} />
                </TumbShareButton>
                <TumbShareButton>
                    <ResponsiveImage src={ShareIcon} alt="share" mobile={mobile} />
                </TumbShareButton>
            </StyledContainer>
        </Wrapper>
    );
};

export default ShareTumbContainer;

const Wrapper = styled.div<{ mobile: boolean }>`
    position: relative;
    height: 100%;
    width: ${({ mobile }) => (mobile ? 'auto' : '10%')};
    display: ${({ mobile }) => (mobile ? 'none' : 'flex')};
    @media (max-width: 1024px) {
        width: ${({ mobile }) => (mobile ? 'auto' : '15%')};
    }
    @media (max-width: 768px) {
        display: ${({ mobile }) => (mobile ? 'flex' : 'none')};
    }
`;

const StyledContainer = styled.div<{ mobile: boolean }>`
    width: auto;
    height: auto;
    padding: ${({ mobile }) => (mobile ? '0em' : '1em')};
    border-radius: 0.875em;
    background-color: #ffffff;
    color: #000000;
    position: ${({ mobile }) => (mobile ? 'static' : 'fixed')};
    top: ${({ mobile }) => (mobile ? '0' : '80px')};
    display: flex;
    flex-direction: ${({ mobile }) => (mobile ? 'row' : 'column')};
    gap: ${({ mobile }) => (mobile ? '0.5em' : '1em')};
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
`;

const ResponsiveImage = styled(Image)<{ mobile: boolean }>`
    width: 70%;
    height: auto;
    @media (max-width: 768px) {
        width: 70%;
    }
    @media (max-width: 480px) {
        width: 50%;
    }
`;
