import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large';
  label: string;
  onClick?: () => void;
}

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      primary={primary}
      size={size}
      backgroundColor={backgroundColor}
      {...props}
    >
      {label}
    </StyledButton>
  );
};


const StyledButton = styled.button<{ primary: boolean, backgroundColor?: string, size: 'small' | 'medium' | 'large' }>`  
  font-weight: 400;
  border: ${({ primary }) => primary ? '0' : 'solid 1px #EAEAEC'};;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  background-color: ${({ primary, backgroundColor }) => primary ? '#004E96' : (backgroundColor ? backgroundColor : 'transparent')};
  color: ${({ primary }) => primary ? 'white' : '#333'};
  font-size: ${({ size }) => size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'};
  padding: ${({ size }) => size === 'small' ? '10px 16px' : size === 'medium' ? '11px 20px' : '12px 24px'};
`;
