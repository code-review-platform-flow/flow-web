import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large' | 'wide' ;
  label: string;
  onClick?: () => void;
  tertiary?: boolean;
}

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  tertiary = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      primary={primary}
      size={size}
      backgroundColor={backgroundColor}
      tertiary={tertiary}
      {...props}
    >
      {label}
    </StyledButton>
  );
};


const StyledButton = styled.button<{ primary: boolean, backgroundColor?: string, size: 'small' | 'medium' | 'large' | 'wide', tertiary: boolean }>`
  font-weight: 400;
  border: ${({ primary, tertiary }) => primary || tertiary ? '0' : 'solid 1px #EAEAEC'};
  border-radius: ${({ tertiary,size }) => tertiary ? '8px' : '3em' || size === 'large' ? '0.75em' : '8px'};
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  background-color: ${({ primary, backgroundColor, tertiary }) => 
    primary ? '#004E96' : 
    tertiary ? '#E3F0FC' : 
    (backgroundColor ? backgroundColor : 'transparent')};
  color: ${({ primary, tertiary }) => primary ? 'white' : tertiary ? '#004E96' : '#000000'};
  font-size: ${({ size }) => size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'};
  padding: ${({ size }) => size === 'small' ? '0.625em 1em' : size === 'medium' ? '0.6875em 1.25em' : '0.75em 1.5em'};
  width : ${( {size} ) => size === 'wide' ? '100%' : 'auto'};
`;

export default Button;
