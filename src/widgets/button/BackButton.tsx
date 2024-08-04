import React from 'react';
import { RowWrapper } from '../wrapper/RowWrapper';
import Image from 'next/image';
import BackIcon from '../../../public/icons/backIcon.svg';
import styled from 'styled-components';

interface BackButtonProps {
    label?: string;
    onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ label='뒤로'  ,onClick}) => {
    return (
        <StyledRowWrapper gap='1.3125em'>
            <Image onClick={onClick} src={BackIcon} alt='뒤로가기 아이콘'/>{label}
        </StyledRowWrapper>
    );
};

export default BackButton;


const StyledRowWrapper = styled(RowWrapper)`
    align-self : start;
`