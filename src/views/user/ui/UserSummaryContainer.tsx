import Button from '@/widgets/button/Button';
import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import React, { BaseSyntheticEvent, useState } from 'react';
import styled from 'styled-components';
import SendIcon from '../../../../public/icons/sendIcon.svg';
import PlusIcon from '../../../../public/icons/plusIcon.svg';
import { UserDepartmentEnterYear } from './Font';
import Link from 'next/link';
import { formatEnterYear } from '@/shared/hook/formatEnterYear';
import pencilIcon from '/public/icons/pencilIcon.svg';
import ModifyIcon from './ModifyIcon';
import { patchUserOneLines } from '../api/patchUserOneLine';
import { activeEnter } from '@/shared/hook/activeEnter';
import { SizedBox } from '@/widgets/wrapper/SizedBox';

// Props 인터페이스 정의
interface UserSummaryContainerProps {
    name: string;
    majorName: string;
    studentNumber: string;
    oneLiner: string;
    profileUrl: string;
    followerCount: number;
    own: boolean;
    email: string;
}

const UserSummaryContainer: React.FC<UserSummaryContainerProps> = ({
    name,
    majorName,
    studentNumber,
    oneLiner,
    profileUrl,
    followerCount,
    own,
    email,
}) => {
    const [editOneLiner, setEditOneLiner] = useState(false);
    const [currentOneLiner, setCurrentOneLiner] = useState(oneLiner);

    const toggleEditingMode = async () => {
        if (editOneLiner) {
            if (currentOneLiner.trim() === '') {
                alert('한줄소개를 입력해주세요.');
                return;
            }

            try {
                // 한줄 소개 수정 API 호출
                const response = await patchUserOneLines(email, currentOneLiner);
                console.log(response);

                alert('닉네임이 수정되었습니다!');
            } catch (error) {
                console.error('닉네임 수정 중 오류 발생:', error);
                alert('한줄 소개 수정에 실패했습니다: ');
                setEditOneLiner(false);
                return;
            }
        }
        setEditOneLiner(!editOneLiner);
    };

    const handleOneLinderChnage = (event: BaseSyntheticEvent) => {
        setCurrentOneLiner(event.target.value);
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
                    <StyledLink href={'/coffeechat'}>
                        <Button size="wide" gap="0.4em" tertiary label="커피챗">
                            <Image src={SendIcon} alt="보내기버튼" />
                        </Button>
                    </StyledLink>
                    <Button size="wide" gap="0.4em" tertiary label="팔로우">
                        <Image src={PlusIcon} alt="팔로우버튼" />
                    </Button>
                </RowWrapper>

                <ColumnWrapper gap="0.5em">
                    <RowWrapper justifyContent="space-between" alignItems='center'>
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

// 스타일 컴포넌트 정의
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
    padding-left : 0em;
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
