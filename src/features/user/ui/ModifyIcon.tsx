import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import pencilIcon from '/public/icons/pencilIcon.svg';

interface ModifyIconProps {
    onClick: () => void;
}

const ModifyIcon: React.FC<ModifyIconProps> = ({ onClick }) => {
    return <Icon onClick={onClick} src={pencilIcon} alt="글쓰기 아이콘" />;
};

export default ModifyIcon;

const Icon = styled(Image)`
    cursor: pointer;
`;
