import React from 'react';
import styled from 'styled-components';

export interface ButtonProps {
  $primary?: boolean;
  backgroundColor?: string;
  size?: 'small' | 'medium' | 'large' | 'wide' ;
  label: string;
  onClick?: () => void;
  tertiary?: boolean;
  children?: React.ReactNode;
  gap?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  $primary = false,
  size = 'medium',
  backgroundColor,
  label,
  tertiary = false,
  children,
  gap='0em',
  type='button',
  ...props
}: ButtonProps) => {
  return (
    <StyledButton 
      $primary={$primary}
      size={size}
      backgroundColor={backgroundColor}
      tertiary={tertiary}
      gap={gap}
      type={type}
      {...props}
    >
      {children}
      {label}
    </StyledButton>
  );
};


const StyledButton = styled.button<{ $primary: boolean, backgroundColor?: string, size: 'small' | 'medium' | 'large' | 'wide', tertiary: boolean , gap:string}>`
  display : flex;
  justify-content : center;
  border: ${({ $primary, tertiary }) => $primary || tertiary ? '0' : 'solid 1px #EAEAEC'};
  border-radius: ${({ tertiary,size }) => tertiary ? '8px' : '3em' || size === 'large' ? '0.75em' : '8px'};
  cursor: pointer;
  background-color: ${({ $primary, backgroundColor, tertiary }) => 
    $primary ? '#004E96' : 
    tertiary ? '#E3F0FC' : 
    (backgroundColor ? backgroundColor : 'transparent')};
  color: ${({ $primary, tertiary }) => $primary ? 'white' : tertiary ? '#004E96' : '#000000'};
  font-size: ${({ size }) => size === 'small' ? '0.75em' : size === 'medium' ? '0.875em' : '0.75em'};
  padding: ${({ size }) => size === 'small' ? '0.625em 1em' : size === 'medium' ? '0.6875em 1.25em' : '0.75em 1.5em'};
  width : ${( {size} ) => size === 'wide' ? '100%' : 'auto'};
  gap : ${({gap})=>gap};
  @media (max-width: 768px) {
        font-size: ${({ size }) => size ==='small' ? '0.35em' : size === 'medium' ? '0.5em': '0.75em'};

    }
`;

export default Button;
