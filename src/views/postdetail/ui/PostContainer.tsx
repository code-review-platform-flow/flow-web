import React from 'react';
import styled from 'styled-components';
import Container from '@/widgets/container/Container';
import UserInfo from '@/widgets/post/UserInfo';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import { ColumnWrapper } from '@/widgets/wrapper/ColumnWrapper';
import PostInfo from '@/widgets/post/PostInfo';
import PostTag from '@/widgets/post/PostTag';
import ProfileExample from '../../../../public/images/profileImageExample.png';
import Image from 'next/image';
import ShareTumbContainer from './ShareTumbContainer';

interface PostContainerProps {}

const PostContainer: React.FC<PostContainerProps> = () => {
    const postData = {
        id: "fdfd",
        title: "KT 60만명 해킹의 심각성: 사상 최악의 \n 사이버 범죄로부터 당신은 지금도 안전하지 않다",
        imgUrl: ProfileExample,
        content: `KT가 60만명 가량의 자사 인터넷을 사용하는 고객의 기기를 해킹했다는 사실이 밝혀졌습니다. 이는 사이버 안전에 대한 심각한 위협이며 모든 이용자의 개인정보를 위태롭게 하는 매우 중대한 사안임에 반해, 상대적으로 적은 관심을 받고 있어 이 사건의 심각성을 재고하고자 글을 작성하였습니다. 해킹은 어떻게 이루어졌나 사건을 간략하게 설명하자면, KT는 웹사이트와 고객 사이에서 일어나는 네트워크를 감청하고 탈취 후 KT가 손수 만든 바이러스를 담은 소프트웨어로 바꿔치기 한 후, 고객의 기기에 있는 파일을 마음대로 조작하고 삭제하였습니다. 이미 여기까지도 많이 심각하지만 이는 사건의 심각성의 빙산의 일각이며 훨씬 더 많은 문제점들이 존재합니다. 처음이 아닐 수 있다. 
        
        KT의 해킹은 매우 악질적이고 고도화되어 있습니다. 직접 멀웨어를 만들어 자사의 서비스를 사용하는 사람들에게 중간자 공격을 통해 배포하고 기기에 심각한 문제를 일으켰으며, 이 과정에서 KT는 특정한 규칙을 가지는 패킷을 갈아치우고, 멀웨어를 만들어 존재하는 프로그램에 삽입하고, 사용자의 기기에 심각한 악영향을 끼치게 했는데, 이러한 해킹은 일반적으로 한번에 설계하기 어려운 매우 고도화된 해킹 수법이며 여러번의 개별 시도를 통해 노하우를 쌓고 여러 기술들을 마련해 놓아야지만 가능합니다. 특히나 이 사건은 60만명의 사용자가 자신의 기기에 '심각한 문제'를 호소했기에 밝혀질 수 있었던 사실입니다. 만약에 KT의 멀웨어가 심각한 문제를 일으키지 않았거나, 소수를 대상으로 한 공격이었다면 밝혀지기 어려웠다는 의미이며, 심지어 KT가 이미 여러 차례 공격을 일으켰으나 원인이 밝혀지지 않고 묻혔을 가능성도 배재하기 어렵습니다.
        
        즉, KT의 고객을 대상으로 한 해킹이 이번이 처음이 아닐 수 있으며, 이미 여러 번 이용자의 네트워크를 갈취하거나 기기에 악성 코드를 삽입했을 수 있습니다. KT의 고객을 대상으로 한 해킹이 이번이 처음이 아닐 수 있으며, 이미 여러 번 이용자의 네트워크를 갈취하거나 기기에 악성 코드를 삽입했을 수 있습니다. KT의 고객을 대상으로 한 해킹이 이번이 처음이 아닐 수 있으며, 이미 여러 번 이용자의 네트워크를 갈취하거나 기기에 악성 코드를 삽입했을 수 있습니다.
        `,
        tags: ["Security", "React", "Front"],
        name: "지민성",
        department: "컴퓨터공학과",
        enterYear: 22,
        time: 6,
        comments: 2,
        tumb: 125,
    };

    return (
        <Container width='90%' padding='1.5em' key={postData.id}>
            <ColumnWrapper>
                <PostTitle>{postData.title}</PostTitle>
                <PostUser justifyContent='space-between'>
                    <UserInfo imgUrl={ProfileExample} department={postData.department} name={postData.name} enterYear={postData.enterYear} />
                    <RowWrapper justifyContent='flex-end' alignItems='flex-end'>
                        <Tags gap='0.2625em' justifyContent='flex-end'>
                            {postData.tags.map((tag, index) => (
                                <PostTag key={index}>{tag}</PostTag>
                            ))}
                        </Tags>
                        <ShareTumbContainer mobile/>
                        <ColumnWrapper width='auto' alignItems='flex-end' gap='0.5em'>
                            <PostInfo isStatic tumbCount={postData.tumb} commentCount={postData.comments} />
                            <UploadTime>약 {postData.time}시간 전</UploadTime>
                        </ColumnWrapper>
                    </RowWrapper>
                </PostUser>
            </ColumnWrapper>
            <PostContentContainer>
                {postData.content}
            </PostContentContainer>
        </Container>
    );
};

export default PostContainer;

const PostUser = styled(RowWrapper)`
    width : 100%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Tags = styled(RowWrapper)`
    margin-right: 1em;
    height: 100%;
    align-items: flex-end;
    @media (max-width: 768px) {
        justify-content: flex-start;
    }
`;


const PostTitle = styled.div`
    font-size: 2.5em;
    font-weight: 600;
    margin-bottom: 1em;
    white-space: pre-wrap;
    @media (max-width: 768px) {
        font-size: 2em;
    }
    @media (max-width: 480px) {
        font-size: 1.5em;
    }
`;

const UploadTime = styled.div`
    color: #8E8E8E;
    font-size: 0.75em;
    @media (max-width: 768px) {
        font-size: 0.7em;
    }
    @media (max-width: 480px) {
        font-size: 0.6em;
    }
`;

const PostContentContainer = styled.div`
    margin-top: 1em;
    line-height: 1.5;
    white-space: pre-wrap;
`;