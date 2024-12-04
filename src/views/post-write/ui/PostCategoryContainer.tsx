import Container from '@/widgets/container/Container';
import React from 'react';
import { PostWriteTitle } from './Font';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Button from '@/widgets/button/Button';
import styled from 'styled-components';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { useRecoilState } from 'recoil';
import { categoryState } from '../model/postAtoms';

interface PostCategoryContainerProps {
    currentCategory?: string;
}

const PostCategoryContainer: React.FC<PostCategoryContainerProps> = ({ currentCategory }) => {
    const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);

    const handleButtonClick = (label: string) => {
        setSelectedCategory((prevCategory) => (prevCategory === label ? '' : label));
    };

    const isCategorySelected = (label: string): boolean => {
        return selectedCategory === label;
    };

    return (
        <Container size="wide">
            <PostWriteTitle>카테고리</PostWriteTitle>
            <SizedBox />
            <RowWrapper gap="0.625em;">
                {['질문', '코드리뷰', '회고', '성과', '고민', '취업', '학교'].map((label) => (
                    <Button
                        key={label}
                        tertiary={!isCategorySelected(label)}
                        $primary={isCategorySelected(label)}
                        label={label}
                        onClick={() => handleButtonClick(label)}
                    />
                ))}
            </RowWrapper>
        </Container>
    );
};

export default PostCategoryContainer;
