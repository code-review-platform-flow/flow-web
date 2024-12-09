import React from 'react';
import styled from 'styled-components';
import { UserSummary } from '@/shared/type/user';
import { encodeBase64 } from '@/shared/hook/base64';
import { useRouter } from 'next/navigation';

interface FollowListContainerProps {
    followers: UserSummary[];
    followees: UserSummary[];
    onClose: () => void;
}

const FollowListContainer: React.FC<FollowListContainerProps> = ({ followers, followees, onClose }) => {
    const router = useRouter();

    const handleProfileNavigation = (email: string) => {
        onClose();
        const encodedEmail = encodeBase64(email);
        router.push(`/user?email=${encodedEmail}`);
    };

    return (
        <FollowListWrapper>
            <FollowListSection>
                <SectionTitle>내가 팔로우한 사람</SectionTitle>
                <UserList>
                    {followees.map((user) => (
                        <UserItem key={user.email} onClick={() => handleProfileNavigation(user.email)}>
                            <ProfileImage src={user.profileUrl} alt={`${user.userName}의 프로필`} />
                            <UserInfo>
                                <UserName>{user.userName}</UserName>
                                <UserMajor>{user.majorName}</UserMajor>
                            </UserInfo>
                        </UserItem>
                    ))}
                    {followees.length === 0 && <NoDataText>아직 팔로우한 사람이 없습니다</NoDataText>}
                </UserList>
            </FollowListSection>

            <Divider />

            <FollowListSection>
                <SectionTitle>나를 팔로우한 사람</SectionTitle>
                <UserList>
                    {followers.map((user) => (
                        <UserItem key={user.email} onClick={() => handleProfileNavigation(user.email)}>
                            <ProfileImage src={user.profileUrl} alt={`${user.userName}의 프로필`} />
                            <UserInfo>
                                <UserName>{user.userName}</UserName>
                                <UserMajor>{user.majorName}</UserMajor>
                            </UserInfo>
                        </UserItem>
                    ))}
                    {followers.length === 0 && <NoDataText>아직 나를 팔로우한 사람이 없습니다</NoDataText>}
                </UserList>
            </FollowListSection>
        </FollowListWrapper>
    );
};

export default FollowListContainer;

const FollowListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
    margin-top: 2em;
    border-top: 1px solid #ddd;
    padding-top: 2em;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1.5em;
    }
`;

const FollowListSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.2em;

    @media (max-width: 768px) {
        gap: 1em;
    }
`;

const SectionTitle = styled.p`
    font-size: 0.875em;
    font-weight: 600;
    text-align: start;
    margin-bottom: 1em;
`;

const Divider = styled.div`
    width: 1px;
    background-color: #e0e0e0;

    @media (max-width: 768px) {
        width: 100%;
        height: 1px;
    }
`;

const UserList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.2em;
`;

const UserItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1em;
    padding: 1em;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        gap: 0.8em;
    }
`;

const ProfileImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: 768px) {
        width: 40px;
        height: 40px;
    }
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        gap: 0.2em;
    }
`;

const UserName = styled.p`
    font-size: 1em;
    font-weight: bold;
    color: #333;

    @media (max-width: 768px) {
        font-size: 0.9em;
    }
`;

const UserMajor = styled.p`
    font-size: 0.875em;
    color: #666;

    @media (max-width: 768px) {
        font-size: 0.8em;
    }
`;

const NoDataText = styled.div`
    text-align: center;
    font-size: 0.9em;
    color: #a5a5a5;
    margin-top: 1em;
`;
