import React from 'react';
import styled from 'styled-components';

interface TossPaymentButtonProps {
    onClick: () => void;
    label: string;
}

const TossPaymentButton: React.FC<TossPaymentButtonProps> = ({ onClick, label }) => {
    return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default TossPaymentButton;

const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    background-color: #004e96;
    border: none;
    color: #ffffff;
    font-size: 0.875em;
    padding: 0.6875em;
    width: 100%;
    @media (max-width: 768px) {
        font-size: 0.5em;
    }
`;
