import Container from '@/widgets/container/Container';
import React from 'react';
import { SemiTitle, YearTitle } from './Font';
import styled from 'styled-components';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { SizedBox } from '@/widgets/wrapper/SizedBox';


interface UserSchoolContainerProps {
}

const UserSchoolContainer: React.FC<UserSchoolContainerProps> = ({  }) => {
    const user = {
        name: '홍길동',
        univName : '가천대',
        department: '컴퓨터공학과',
        enterYear: '2022',
        quitYear:'재학중'
    };
    return (
        <Container width='100%' >
                <SemiTitle>학력</SemiTitle>
                <SizedBox height='0.5em'/>
                <RowWrapper gap='3em'>
                    <YearTitle><Retangle/>{user.enterYear} ~ {user.quitYear}</YearTitle>
                    <SchoolDepartment>{user.univName} {user.department}</SchoolDepartment>
                </RowWrapper>
        </Container>
    );
};

export default UserSchoolContainer;

const Retangle = styled.div`
    border-radius : 100%;
    width : 0.5em;
    height : 0.5em;
    background-color : #D9D9D9;
`

const SchoolDepartment = styled.div`
    font-weight : 500;
    font-size : 0.9375em;
`