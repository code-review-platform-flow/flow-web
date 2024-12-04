import Container from '@/widgets/container/Container';
import React, { useEffect } from 'react';
import { PostWriteTitle } from './Font';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import Input from '@/widgets/input/Input';
import { useRecoilState } from 'recoil';
import { titleState } from '../model/postAtoms';
import styled from 'styled-components';

interface PostTitleContainerProps {
    currentTitle?: string;
}

const PostTitleContainer: React.FC<PostTitleContainerProps> = ({ currentTitle }) => {
    const [title, setTitle] = useRecoilState(titleState);

    useEffect(() => {
        if (currentTitle) {
            setTitle(currentTitle);
        }
    }, [currentTitle, setTitle]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    return (
        <Container size="wide">
            <PostWriteTitle>제목</PostWriteTitle>
            <SizedBox />
            <StyledInput
                value={title}
                size="large"
                backgroundColor="none"
                border
                placeholder="제목을 입력해주세요!"
                lowround
                onChange={handleTitleChange}
            />
        </Container>
    );
};

export default PostTitleContainer;

const StyledInput = styled(Input)`
    padding: 1.125em;
`;
