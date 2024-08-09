import React from 'react';
import { RowWrapper } from '../wrapper/RowWrapper';
import Image from 'next/image';
import BackIcon from '../../../public/icons/backIcon.svg';
import styled from 'styled-components';
import Link from 'next/link';

interface BackButtonProps {
    label?: string;
    onClick?: () => void;
    href?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href='/',label='뒤로'  ,onClick}) => {
    return (
            <StyledLink href={href}>
                <Image onClick={onClick} src={BackIcon} alt='뒤로가기 아이콘'/>{label}
            </StyledLink>
    );
};

export default BackButton;


const StyledLink = styled(Link)`
    display : flex;
    align-self : start;
    align-items : center;
    gap : 1.3125em;
`