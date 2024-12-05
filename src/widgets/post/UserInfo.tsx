'use client';
import React from 'react';
import styled from 'styled-components';
import { RowWrapper } from '../wrapper/RowWrapper';
import { ColumnWrapper } from '../wrapper/ColumnWrapper';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

interface UserInfoProps {
    name: string;
    imgUrl: string | StaticImageData;
    department: string;
    enterYear: string;
    email?: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, imgUrl, department, enterYear, email }) => {
    const imageUrl = typeof imgUrl === 'string' ? imgUrl : imgUrl.src;
    const router = useRouter();
    const handleNavigation = () => {
        const encodedEmail = Buffer.from(email!).toString('base64');
        router.push(`/user?email=${encodedEmail}`);
    };
    return (
        <RowWrapper style={{ cursor: 'pointer' }} gap="0.5em" onClick={handleNavigation}>
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

const ProfileImage = styled(Image)`
    border-radius: 1em;
`;

const UserName = styled.div`
    font-size: 0.875em;
    font-weight: 500;
`;

const UserDetailInfo = styled.div`
    font-size: 0.75em;
    color: #8e8e8e;
`;
