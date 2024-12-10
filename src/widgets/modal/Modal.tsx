import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    padding?: string;
    width?: string;
    maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    padding = '2em',
    width = 'auto',
    maxWidth = '100%',
}) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <ModalOverlay>
            <ModalContent padding={padding} width={width} maxWidth={maxWidth}>
                <CloseButton onClick={onClose}>✕</CloseButton>
                {children}
            </ModalContent>
        </ModalOverlay>,
        document.body,
    );
};

export default Modal;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

const ModalContent = styled.div<{ padding: string; width: string; maxWidth: string }>`
    position: relative;
    padding: ${(props) => props.padding};
    box-sizing: border-box;
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    justify-content: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    &:hover {
        color: #004e96;
    }
`;
