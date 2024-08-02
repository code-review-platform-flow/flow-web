import Container from '@/widgets/container/Container';
import React from 'react';
import { PosrtWriteTitle } from './Font';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import Input from '@/widgets/input/Input';

interface PostTagContainerProps {
}

const PostTagContainer: React.FC<PostTagContainerProps> = ({  }) => {
    return (
        <Container size='wide'> 
            <PosrtWriteTitle>태그</PosrtWriteTitle>
            <SizedBox/>
            <Input size='large' backgroundColor='none' border placeholder='태그를 입력해주세요!' lowround />
        </Container>
    );
};

export default PostTagContainer;