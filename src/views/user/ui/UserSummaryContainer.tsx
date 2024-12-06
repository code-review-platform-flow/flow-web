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
import Link from 'next/link';
import { formatEnterYear } from '@/shared/hook/formatEnterYear';
import ModifyIcon from './ModifyIcon';
import { patchUserOneLines } from '../api/patchUserOneLine';
import { activeEnter } from '@/shared/hook/activeEnter';
import { postFollow } from '../api/postFollow';
import personIconUrl from '../../../../public/icons/personIcon.svg';
import checkIconUrl from '../../../../public/icons/checkIcon.svg';
import { deleteFollow } from '../api/deleteFollow';
import { getFollowerList } from '../api/getFollowerList';
import boxIconUrl from '../../../../public/icons/boxIcon3.svg';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userSummaryState } from '@/entities/auth/model';
import { encodeBase64 } from '@/shared/hook/base64';
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
    visitorEmail: string;
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
        try {
            const response = await postFollow(email, visitorEmail);
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
        try {
            const response = await deleteFollow(email, visitorEmail);
            if (response) {
                alert('팔로우 취소 되었습니다');
                window.location.reload();
            }
        } catch (error) {
            console.error('팔로우 취소 요청 중 오류 발생:', error);
            alert('팔로우 취소에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleFollowList = async () => {
        try {
            const response = await getFollowerList(visitorEmail);
            console.log(response);
        } catch (error) {
            console.error('팔로워 리스트 요청 중 오류 발생:', error);
            alert('팔로우 리스트 요청에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleCoffeeChat = () => {
        if (own) {
            alert('본인의 페이지에서는 커피챗을 보낼 수 없습니다.');
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
            content: '',
        };

        const encodedChatData = encodeBase64(chatData);
        router.push(`/coffee-chat?data=${encodedChatData}`);
    };

    return (
        <UserSummaryContainerWrapper round width="30%">
            <ColumnWrapper gap="0.75em">
                <RowWrapper gap="1em">
                    <Image
                        style={{ borderRadius: '1em' }}
                        width={80}
                        height={80}
                        src={profileUrl}
                        alt="프로필 이미지"
                    />
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
                        <Button onClick={handleFollowList} size="wide" gap="0.4em" tertiary label="팔로워 확인하기">
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
        </UserSummaryContainerWrapper>
    );
};

export default UserSummaryContainer;

const StyledLink = styled(Link)`
    width: 100%;
`;

const UserSummaryContainerWrapper = styled(Container)`
    position: fixed;

    @media (max-width: 768px) {
        position: static;
    }
`;

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
