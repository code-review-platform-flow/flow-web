import Container from '@/widgets/container/Container';
import React from 'react';
import { PosrtWriteTitle } from './Font';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Button from '@/widgets/button/Button';
import styled from 'styled-components';
import { SizedBox } from '@/widgets/wrapper/SizedBox';

interface PostCategoryContainerProps {}

const PostCategoryContainer: React.FC<PostCategoryContainerProps> = ({}) => {
    return (
        <Container size="wide">
            <PosrtWriteTitle>카테고리</PosrtWriteTitle>
            <SizedBox />
            <RowWrapper gap="0.625em;">
                <Button tertiary label="질문" />
                <Button tertiary label="코드리뷰" />
                <Button tertiary label="회고" />
                <Button tertiary label="성과" />
                <Button tertiary label="고민" />
                <Button tertiary label="취업" />
                <Button tertiary label="학교" />
            </RowWrapper>
        </Container>
    );
};

export default PostCategoryContainer;
