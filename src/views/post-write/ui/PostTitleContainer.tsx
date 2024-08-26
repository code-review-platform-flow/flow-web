import Container from '@/widgets/container/Container';
import React from 'react';
import { PosrtWriteTitle } from './Font';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import Input from '@/widgets/input/Input';

interface PostTitleContainerProps {}

const PostTitleContainer: React.FC<PostTitleContainerProps> = ({}) => {
    return (
        <Container size="wide">
            <PosrtWriteTitle>제목</PosrtWriteTitle>
            <SizedBox />
            <Input size="large" backgroundColor="none" border placeholder="제목를 입력해주세요!" lowround />
        </Container>
    );
};

export default PostTitleContainer;
