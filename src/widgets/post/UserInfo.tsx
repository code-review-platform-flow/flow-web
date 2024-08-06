import React from 'react';
import styled from 'styled-components';
import { RowWrapper } from '../wrapper/RowWrapper';
import { ColumnWrapper } from '../wrapper/ColumnWrapper';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface UserInfoProps {
    name: string;
    imgUrl: string | StaticImageData;
    department: string;
    enterYear: number;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, imgUrl, department, enterYear }) => {
    const imageUrl = typeof imgUrl === 'string' ? imgUrl : imgUrl.src;

    return (
        <RowWrapper gap='0.5em'>
            <ProfileImage src={imageUrl} alt='프로필' />
            <ColumnWrapper>
                <UserName>{name}</UserName>
                <UserDetailInfo>{department} {enterYear}학번</UserDetailInfo>
            </ColumnWrapper>
        </RowWrapper>
    );
};

export default UserInfo;

const ProfileImage = styled(Image)`
    width: 32px;
    height: 32px;
`;

const UserName = styled.div`
    font-size: 0.875em;
    font-weight: 500;
`;

const UserDetailInfo = styled.div`
    font-size: 0.75em;
    color: #8E8E8E;
`;
