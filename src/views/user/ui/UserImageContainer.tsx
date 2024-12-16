import Image from 'next/image';
import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { patchProfileImage } from '../api/patchProfileImage';

interface UserImageContainerProps {
    profileUrl: string;
    email: string;
    own: boolean;
}

const UserImageContainer: React.FC<UserImageContainerProps> = ({ profileUrl, email, own }) => {
    const [currentProfileUrl, setCurrentProfileUrl] = useState<string>(profileUrl);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);

        try {
            const response = await patchProfileImage(formData);
            setCurrentProfileUrl(response.filePath); // 업로드된 파일 URL로 업데이트
            alert('프로필 이미지가 업데이트되었습니다.');
        } catch (error) {
            console.error('프로필 이미지 업로드 실패:', error);
            alert('이미지 업로드에 실패했습니다.');
        }
    };

    return (
        <ImageContainer>
            <Image style={{ borderRadius: '1em' }} width={80} height={80} src={currentProfileUrl} alt="프로필 이미지" />
            {own && (
                <ImageChangeButton>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </ImageChangeButton>
            )}
        </ImageContainer>
    );
};

export default UserImageContainer;

const ImageContainer = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 100%;
`;

const ImageChangeButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    width: 100%;
    height: 40%;

    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    font-size: 0.8em;
    font-weight: bold;
    cursor: pointer;

    border-radius: 0 0 100% 100%;

    input {
        display: none;
    }

    &::after {
        content: '✎ 변경';
        font-size: 1em;
        text-align: center;
    }
`;
