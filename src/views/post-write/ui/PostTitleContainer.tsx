import Container from '@/widgets/container/Container';
import React, { useState } from 'react';
import { PostWriteTitle } from './Font';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import Input from '@/widgets/input/Input';
import { useRecoilState } from 'recoil';
import { titleState } from '../model/postAtoms';

const PostTitleContainer: React.FC = ({}) => {
    const [title, setTitle] = useRecoilState(titleState);
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <Container size="wide">
            <PostWriteTitle>제목</PostWriteTitle>
            <SizedBox />
            <Input
                value={title}
                size="large"
                backgroundColor="none"
                border
                placeholder="제목를 입력해주세요!"
                lowround
                onChange={handleTitleChange}
            />
        </Container>
    );
};

export default PostTitleContainer;
