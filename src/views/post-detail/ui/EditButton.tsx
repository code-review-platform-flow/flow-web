import React, { ReactEventHandler } from 'react';
import styled from 'styled-components';

interface EditButtonProps {
    width?: number;
    height?: number;
    color?: string;
    hoverColor?: string;
    onClick?: ReactEventHandler;
}

const EditButton: React.FC<EditButtonProps> = ({
    width = 20,
    height = 20,
    color = 'currentColor',
    hoverColor = '#004e96',
    onClick,
}) => (
    <StyledSVG
        onClick={onClick}
        width={width}
        height={height}
        color={color}
        hoverColor={hoverColor}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
    >
        <path d="M9.95823 19.8265C15.2618 19.8265 19.67 15.4182 19.67 10.1146C19.67 4.80171 15.2521 0.402832 9.94848 0.402832C4.63595 0.402832 0.246826 4.80171 0.246826 10.1146C0.246826 15.4182 4.6453 19.8265 9.95823 19.8265ZM13.6055 7.50571L12.5103 6.41086L13.1863 5.74461C13.491 5.44927 13.8339 5.42043 14.1101 5.69668L14.3193 5.9063C14.5956 6.18255 14.5671 6.51568 14.2718 6.82971L13.6055 7.50571ZM6.98773 14.0947L5.72145 14.5708C5.51223 14.6468 5.29286 14.4562 5.38833 14.2279L5.91198 12.9998L11.9582 6.96296L13.053 8.04846L6.98773 14.0947Z" />
    </StyledSVG>
);

export default EditButton;

const StyledSVG = styled.svg<{ color: string; hoverColor: string }>`
    fill: ${({ color }) => color};
    cursor: pointer;
    transition: fill 0.3s ease;

    &:hover {
        fill: ${({ hoverColor }) => hoverColor};
    }
`;
