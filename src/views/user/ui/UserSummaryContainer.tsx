import Button from '@/widgets/button/Button';
import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import SendIcon from '../../../../public/icons/sendIcon.svg';
import PlusIcon from '../../../../public/icons/plusIcon.svg';
import { UserDepartmentEnterYear } from './Font';
import Link from 'next/link';
import { formatEnterYear } from '@/shared/hook/formatEnterYear';

// Props 인터페이스 정의
interface UserSummaryContainerProps {
    name: string;
    majorName: string;
    studentNumber: string;
    introduce: string;
    profileUrl: string;
    followerCount: number;
}

const UserSummaryContainer: React.FC<UserSummaryContainerProps> = ({
    name,
    majorName,
    studentNumber,
    introduce,
    profileUrl,
    followerCount,
}) => {
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
                    <IntroduceTitle>소개</IntroduceTitle>
                    <IntroduceText>{introduce}</IntroduceText>
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
    font-size: 0.8125em;
`;

const ButtonWrapper = styled.div`
    width: 100%;
`;
