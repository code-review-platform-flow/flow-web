import Button from '@/widgets/button/Button';
import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import React, { BaseSyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import sendIconUrl from '../../../../public/icons/sendIcon.svg';
import plusIconUrl from '../../../../public/icons/plusIcon.svg';
import { UserDepartmentEnterYear } from './Font';

import { formatEnterYear } from '@/shared/hook/formatEnterYear';
import ModifyIcon from './ModifyIcon';
import { patchUserOneLines } from '../api/patchUserOneLine';
import { activeEnter } from '@/shared/hook/activeEnter';
import { postFollow } from '../api/postFollow';

import checkIconUrl from '../../../../public/icons/checkIcon.svg';
import { deleteFollow } from '../api/deleteFollow';
import personIconUrl from '../../../../public/icons/personIcon.svg';

import boxIconUrl from '../../../../public/icons/boxIcon3.svg';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userSummaryState } from '@/entities/auth/model';
import { encodeBase64 } from '@/shared/hook/base64';
import { UserSummary } from '@/shared/type/user';
import { getFollowerList } from '../api/getFollowerList';
import FollowListContainer from './FollowListContainer';
import UserImageContainer from './UserImageContainer';

interface UserSummaryContainerProps {
    name: string;
    majorName: string;
    studentNumber: string;
    oneLiner: string;
    profileUrl: string;
    followerCount: number;
    own: boolean;
    followHost: boolean;
    email: string;
    visitorEmail?: string;
}

const UserSummaryContainer: React.FC<UserSummaryContainerProps> = ({
    name,
    majorName,
    studentNumber,
    oneLiner,
    profileUrl,
    followerCount,
    own,
    followHost,
    email,
    visitorEmail,
}) => {
    const [editOneLiner, setEditOneLiner] = useState(false);
    const [currentOneLiner, setCurrentOneLiner] = useState(oneLiner);

    const userSummary = useRecoilValue(userSummaryState);
    const router = useRouter();

    const [showFollowList, setShowFollowList] = useState(false);

    const [followers, setFollowers] = useState<UserSummary[]>([]);
    const [followees, setFollowees] = useState<UserSummary[]>([]);

    const handleFollowListToggle = async () => {
        if (showFollowList) {
            setShowFollowList(false);
        }
        if (!showFollowList) {
            try {
                const { followers: fetchedFollowers, followees: fetchedFollowees } = await getFollowerList(email);
                setFollowers(fetchedFollowers);
                setFollowees(fetchedFollowees);
                setShowFollowList(true);
            } catch (error) {
                console.error('팔로우 리스트 요청 중 오류 발생:', error);
                alert('팔로우 리스트를 불러오는 중 오류가 발생했습니다.');
            }
        }
    };

    const toggleEditingMode = async () => {
        if (editOneLiner) {
            if (currentOneLiner.trim() === '') {
                alert('한줄소개를 입력해주세요.');
                return;
            }

            try {
                const response = await patchUserOneLines(email, currentOneLiner);
                console.log(response);

                alert('소개글이 수정되었습니다!');
            } catch (error) {
                console.error('소개글 수정 중 오류 발생:', error);
                alert('소개글 수정에 실패했습니다: ');
                setEditOneLiner(false);
                return;
            }
        }
        setEditOneLiner(!editOneLiner);
    };

    const handleOneLinderChnage = (event: BaseSyntheticEvent) => {
        setCurrentOneLiner(event.target.value);
    };

    const handleFollow = async () => {
        if (!visitorEmail) {
            alert('로그인 후 플로우에 참여해요!');
            return;
        }

        try {
            const response = await postFollow(visitorEmail, email);
            if (response) {
                alert('팔로우 되었습니다!');
                window.location.reload();
            }
        } catch (error) {
            console.error('팔로우 요청 중 오류 발생:', error);
            alert('팔로우에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleFollowCancle = async () => {
        if (!visitorEmail) {
            alert('로그인 후 플로우에 참여해요!');
            return;
        }
        try {
            const response = await deleteFollow(visitorEmail, email);
            if (response) {
                alert('팔로우 취소 되었습니다');
                window.location.reload();
            }
        } catch (error) {
            console.error('팔로우 취소 요청 중 오류 발생:', error);
            alert('팔로우 취소에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleCoffeeChat = () => {
        if (!visitorEmail) {
            alert('로그인 후 플로우에 참여해요!');
            return;
        }

        if (own) {
            router.push(`/mailbox`);
            return;
        }

        const chatData = {
            sender: {
                email: visitorEmail,
                name: userSummary?.userName,
                photo: userSummary?.profileUrl,
            },
            receiver: {
                email,
                name,
                photo: profileUrl,
            },
            contents: '',
        };

        const encodedChatData = encodeBase64(chatData);
        router.push(`/coffee-chat?data=${encodedChatData}`);
    };

    return (
        <UserSummaryContainerWrapper round width="100%">
            <ColumnWrapper gap="0.75em">
                <RowWrapper gap="1em">
                    <UserImageContainer profileUrl={profileUrl} email={email} own={own} />
                    <ColumnWrapper gap="0.35em">
                        <UserName>{name}</UserName>
                        <UserDepartmentEnterYear>
                            {majorName} {formatEnterYear(studentNumber)}
                        </UserDepartmentEnterYear>
                        <UserDepartmentEnterYear>{followerCount} 팔로워</UserDepartmentEnterYear>
                    </ColumnWrapper>
                </RowWrapper>

                <RowWrapper gap="1em">
                    {own ? (
                        <Button onClick={handleCoffeeChat} size="wide" gap="0.4em" tertiary label="커피챗 확인">
                            <Image src={boxIconUrl} alt="보내기버튼" />
                        </Button>
                    ) : (
                        <Button onClick={handleCoffeeChat} size="wide" gap="0.4em" tertiary label="커피챗">
                            <Image src={sendIconUrl} alt="보내기버튼" />
                        </Button>
                    )}

                    {followHost ? (
                        <Button onClick={handleFollowCancle} size="wide" gap="0.4em" tertiary label="팔로우 취소하기">
                            <Image src={checkIconUrl} alt="팔로우 버튼" />
                        </Button>
                    ) : own ? (
                        <Button
                            onClick={handleFollowListToggle}
                            size="wide"
                            gap="0.4em"
                            tertiary
                            label="팔로우 확인하기"
                        >
                            <Image src={personIconUrl} alt="팔로워 확인 버튼" />
                        </Button>
                    ) : (
                        <Button onClick={handleFollow} size="wide" gap="0.4em" tertiary label="팔로우">
                            <Image src={plusIconUrl} alt="팔로우 버튼" />
                        </Button>
                    )}
                </RowWrapper>

                <ColumnWrapper gap="0.5em">
                    <RowWrapper justifyContent="space-between" alignItems="center">
                        <IntroduceTitle>소개</IntroduceTitle>
                        {own &&
                            (editOneLiner ? (
                                <Button tertiary size="small" label="저장" onClick={() => toggleEditingMode()} />
                            ) : (
                                <ModifyIcon onClick={() => toggleEditingMode()} />
                            ))}
                    </RowWrapper>
                    {editOneLiner ? (
                        <IntroduceTextInput
                            type="text"
                            value={currentOneLiner}
                            onChange={handleOneLinderChnage}
                            onKeyDown={(event) => activeEnter(event, () => toggleEditingMode())}
                            autoFocus
                        />
                    ) : (
                        <IntroduceText>{currentOneLiner}</IntroduceText>
                    )}
                </ColumnWrapper>
            </ColumnWrapper>
            {showFollowList && (
                <FollowListContainer
                    onClose={() => setShowFollowList(false)}
                    followees={followees}
                    followers={followers}
                />
            )}
        </UserSummaryContainerWrapper>
    );
};

export default UserSummaryContainer;

const UserSummaryContainerWrapper = styled(Container)``;

const UserName = styled.div`
    font-weight: 500;
    color: #333333;
    font-size: 0.9375em;
`;

const IntroduceTitle = styled.div`
    font-weight: 600;
    font-size: 0.875em;
`;

const IntroduceText = styled.div`
    width: 100%;
    font-size: 0.8125em;
    padding: 0.5em;
    padding-left: 0em;
    box-sizing: border-box;
`;

const IntroduceTextInput = styled.input`
    border-radius: 1em;
    background: #f5f5f7;
    font-size: 0.8125em;
    padding: 0.5em;
    box-sizing: border-box;
    width: 100%;
    border: none;
    font-family: 'Pretendard';
    &:focus {
        outline: none;
    }
`;
