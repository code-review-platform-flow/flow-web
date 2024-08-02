import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Image from 'next/image';
import React from 'react';
import { SemiTitle, UserDepartmentEnterYear, YearDescription } from './Font';
import PostInfo from '@/widgets/post/PostInfo';
import styled from 'styled-components';
import ProfileImg from '../../../../public/images/profileImageExample.png';
import Container from '@/widgets/container/Container';
import { SizedBox } from '@/widgets/wrapper/SizedBox';

interface UserPostContainerProps {
    // postDate: string;
    // userName: string;
    // uploadTime: string;
    // postTitle: string;
    // postContent: string;
    // commentCount: number;
    // tumbCount: number;
}

const UserPostContainer: React.FC<UserPostContainerProps> = ({
    // postDate,
    // userName,
    // uploadTime,
    // postTitle,
    // postContent,
    // commentCount,
    // tumbCount
}) => {
    const user = {
        profile:ProfileImg,
        postDate:'7.3',
        userName : '박경열',
        uploadTime : 7,
        department : '컴퓨터공학과',
        enterYear : '16',
        postTitle : '다시 한번 useState를 파헤쳐보자',
        postContent : 
                        `
                        리액트에서 함수현 컴포넌트를 사용하면 리액트의 편리한 hook을 사용할 수 있다.hook의 종류는 다양한데 그중 가장 기본적이고 제일 중요한 useState를 다시 공부해 보자. 더 딥하게!
                        📌 useState 란?
                        컴포넌트의 상태를 간편하게 생성하고 업데이트 해주는 도구를 제공해준다.
                        📌 state란?
                        컴포넌트의 상태를 말한다.
                        state 생성과 동시에 가져야할 초기값을 useState 함수에 인자로 넣어주면 state와 setState를 두가지 요소를 배열 형태로 리턴해준다.const [state, setState] = useState(초기값);
                        컴포넌트의 현재 상태 값은 state 라는 변수에 들어있고 state를 변경하고 싶으면 setState 함수를 이용해서 변경할 수 있다. 여기서 state와 setState의 이름은 마음대로 지정할 수 있다.
                        setState를 이용해서 state를 변경하면 해당 컴포넌트는 화면에 다시 렌더링이 된다.

                        예시를 통해 알아보자.
                        import { useState } from "react";        
                        `,
        commentCount: 6,
        tumbCount: 21,
    };

    return (
        <>
            <RowWrapper gap='0.35em' alignItmes='start'>
                <PostDate>{user.postDate}</PostDate>
                <SizedBox height='100%' width='1em'/>
                <Line />
                <Image src={user.profile} alt="User Image" width={50} height={50} />
                <PostUserContainer>
                    <RowWrapper gap='0.5em'>
                        <ColumnWrapper gap='0.275em'>
                            <UserName>{user.userName}</UserName>
                            <RowWrapper gap='1em'>
                                <UserDepartmentEnterYear>{user.department} {user.enterYear}학번</UserDepartmentEnterYear>
                                <UploadTime>약{user.uploadTime}시간 전</UploadTime>
                            </RowWrapper>
                        </ColumnWrapper>
                    </RowWrapper>
                    <SizedBox height='0.75em'/>
                    <PostContainer round>
                        <PostTitle>{user.postTitle}</PostTitle>
                        <PostContent>{user.postContent}</PostContent>
                        <PostInfo commentCount={user.commentCount} tumbCount={user.tumbCount} />
                    </PostContainer>
                </PostUserContainer>
            </RowWrapper>
        </>
    );
};

export default UserPostContainer;

const PostContainer = styled(Container)`
    position : relative;
`

const PostDate = styled.div`
    font-size: 0.75em;
    color: #8E8E8E;
`;

const Line = styled.div`
    width: 3px;
    height: 100%;
    background-color: #EAEAEC;
`;

const PostUserContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const UserName = styled.div`
    font-size: 16px;
    font-weight: bold;
`;

const UploadTime = styled.div`
    font-size: 0.75em;
    color: #8E8E8E;
`;

const PostTitle = styled.div`
    font-size: 1.125em;
    font-weight: 500;
    margin-bottom: 10px;
`;

const PostContent = styled.div`
    font-size: 0.75em;
    color: #707070;
    margin-bottom: 2em;
    line-height: 2;
`;