import React, { ReactEventHandler } from 'react';
import styled from 'styled-components';

interface DeleteButtonProps {
    width?: number;
    height?: number;
    color?: string;
    hoverColor?: string;
    onClick?: ReactEventHandler;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    width = 20,
    height = 20,
    color = '#ACACAC',
    hoverColor = '#004E96',
    onClick,
}) => (
    <StyledSVG
        onClick={onClick}
        width={width}
        height={height}
        color={color}
        hoverColor={hoverColor}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 24C18.6274 24 24 18.627 24 12C24 5.37305 18.6274 0 12 0C5.37256 0 0 5.37305 0 12C0 18.627 5.37256 24 12 24ZM8.92212 16.0381C9.11011 16.2256 9.33594 16.3193 9.59985 16.3193H14.3999C14.6643 16.3203 14.8904 16.2266 15.0781 16.0381C15.2661 15.8496 15.3599 15.624 15.3599 15.3594V9.12012H15.8398V8.16016H13.4399V7.67969H10.5598V8.16016H8.15991V9.12012H8.63989V15.3594C8.64014 15.624 8.73438 15.8496 8.92212 16.0381ZM11.52 14.3994H10.5598V10.0801H11.52V14.3994ZM13.4399 14.3994H12.48V10.0801H13.4399V14.3994Z"
        />
    </StyledSVG>
);

export default DeleteButton;

const StyledSVG = styled.svg<{ color: string; hoverColor: string }>`
    path {
        fill: ${({ color }) => color};
        transition: fill 0.3s ease;
    }
    cursor: pointer;

    &:hover path {
        fill: ${({ hoverColor }) => hoverColor};
    }

    @media (max-width: 768px) {
        width: 32px;
        height: 32px;
    }

    @media (max-width: 480px) {
        width: 24px;
        height: 24px;
    }
`;
