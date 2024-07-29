import React from 'react';
import styled from 'styled-components';
import BottomArrow from '../../../public/icons/bottomArrow.svg';
import Image from 'next/image';

export interface SelectProps {
    border?: boolean;
    size?: 'medium' | 'large';
    onChange?: () => void;
    backgroundColor?: string;
    placeholder?: string;
    icon?: string; 
    firstValue?: string;
    children?:React.ReactNode;
}

export const Select = ({
    size = 'medium',
    placeholder = '',
    icon = BottomArrow,  // 기본 아이콘 설정
    firstValue,
    children,
    ...props
}: SelectProps) => {
    return (
        <SelectWrapper>
            <StyledSelect
                size={size}
                {...props}>
                <option value="">{firstValue}</option>
                {children}
            </StyledSelect>
            <Icon width={16} height={16} src={icon} alt="icon" />
        </SelectWrapper>
    );
};

const SelectWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`;

const Icon = styled(Image)`
    position: absolute;
    right: 10px;
`;

const StyledSelect = styled.select<{ border?: boolean; size: 'medium' | 'large'; primary?: boolean; backgroundColor?: string; }>`
    border: ${({ border }) => (border ? 'solid 1px #EDEDED' : 'none')};
    border-radius: 12px;
    background-color: ${({ backgroundColor }) => backgroundColor || '#F9F9F9'};
    color: #000000;
    padding: 0.55em 2.55em 0.55em 0.55em;
    font-size: 1em;
    font-weight: 400;
    font-family: 'Pretendard';
    outline: none;
    -webkit-appearance: none;  /* 크롬 화살표 없애기 */
    -moz-appearance: none; /* 파이어폭스 화살표 없애기 */
    appearance: none;  /* 화살표 없애기 */
    width: ${({ size }) => {
        switch (size) {
            case 'medium':
                return '200px';
            case 'large':
                return '100%';
            default:
                return '200px';
        }
    }};
`;

export default Select;
