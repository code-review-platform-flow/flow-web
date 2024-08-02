import Button from '@/widgets/button/Button';
import Container from '@/widgets/container/Container';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import React from 'react';
import ProfileExample from '../../../../public/images/profileImageExample.png'
import styled from 'styled-components';
import SendIcon from  '../../../../public/icons/sendIcon.svg';
import PlusIcon from  '../../../../public/icons/plusIcon.svg';

interface UserSummaryContainerProps {
}

const UserSummaryContainer: React.FC<UserSummaryContainerProps> = ({  }) => {
    const user = {
        name: '홍길동',
        department: '컴퓨터공학과',
        enterYear: '2022',
        introduce: '안녕하세요, 저는 컴퓨터공학과 22학번 홍길동입니다.'
    };

    return (

        <Container round width='35%'>
            <ColumnWrapper gap='0.75em'>
                <RowWrapper gap='1em'>
                    <Image width={80} src={ProfileExample} alt='프로플 이미지'/>
                    <ColumnWrapper gap='0.35em'>
                        <UserName>{user.name}</UserName>
                        <UserDepartmentEnterYear>{user.department}{user.enterYear}</UserDepartmentEnterYear>
                        <UserDepartmentEnterYear>{user.enterYear}팔로워</UserDepartmentEnterYear>
                    </ColumnWrapper>
                </RowWrapper>

                <RowWrapper gap='1em'>
                    <Button  size='wide' gap='0.4em' tertiary label='커피챗'>
                        <Image src={SendIcon} alt='보내기버튼'/></Button>
                    <Button size='wide' gap='0.4em' tertiary label='팔로우'>
                        <Image src={PlusIcon} alt='팔로우버튼'/></Button>
                </RowWrapper>

                <ColumnWrapper gap='0.5em'>
                    <IntroduceTitle>소개</IntroduceTitle>
                    <IntroduceText>
                        {user.introduce}
                    </IntroduceText>
                </ColumnWrapper>
            </ColumnWrapper>
        </Container>
    );
};

export default UserSummaryContainer;

const UserName = styled.div`
    font-weight : 500;
    color : #333333;
    font-size : 0.9375em;
`

const UserDepartmentEnterYear = styled.div`
    color : #999999;
    font-size : 0.8125em;
`

const IntroduceTitle = styled.div`
    font-weight : 600;
    font-size : 0.875em;
`

const IntroduceText = styled.div`
    font-size : 0.8125em;
`

const ButtonWrapper = styled.div`
    width : 100%;
`