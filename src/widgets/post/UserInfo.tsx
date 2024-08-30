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
    enterYear: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, imgUrl, department, enterYear }) => {
    const imageUrl = typeof imgUrl === 'string' ? imgUrl : imgUrl.src;

    return (
        <RowWrapper gap="0.5em">
            <ProfileImage width={32} height={32} src={imageUrl} alt="프로필" />
            <ColumnWrapper>
                <UserName>{name}</UserName>
                <UserDetailInfo>
                    {department} {enterYear ? `${enterYear.toString().substring(0, 2)}학번` : ''}
                </UserDetailInfo>
            </ColumnWrapper>
        </RowWrapper>
    );
};

export default UserInfo;

const ProfileImage = styled(Image)``;

const UserName = styled.div`
    font-size: 0.875em;
    font-weight: 500;
`;

const UserDetailInfo = styled.div`
    font-size: 0.75em;
    color: #8e8e8e;
`;
