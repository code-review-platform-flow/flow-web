import React from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';
import useAlarms from './hooks/useAlarms';

interface AlarmContainerProps {
    src: string;
    alt: string;
    email: string;
    onClick: () => void;
}

const AlarmContainer: React.FC<AlarmContainerProps> = ({ src, alt, email, onClick }) => {
    const unreadCount = useAlarms(email);

    return (
        <IconWrapper onClick={onClick}>
            {unreadCount > 0 && <AnimatedAlarmCount key={unreadCount}>{unreadCount}</AnimatedAlarmCount>}
            <Icon src={src} alt={alt} />
        </IconWrapper>
    );
};

export default AlarmContainer;

// Keyframes 애니메이션 정의
const popAnimation = keyframes`
    0% {
        transform: scale(0.8);
        opacity: 0.5;
    }
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
    100% {
        transform: scale(1);
    }
`;

const IconWrapper = styled.div`
    margin-right: 1em;
    position: relative;
    display: inline-block;
`;

const AnimatedAlarmCount = styled.div`
    position: absolute;
    top: -0.5em;
    left: -0.95em;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 0.25em 0.25em;
    font-size: 0.8125rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;

    /* 애니메이션 적용 */
    animation: ${popAnimation} 0.3s ease-in-out;
`;

const Icon = styled(Image)`
    cursor: pointer;
`;
