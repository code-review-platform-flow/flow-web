import Container from '@/widgets/container/Container';
import React from 'react';
import { PostWriteTitle } from './Font';
import { RowWrapper } from '@/widgets/wrapper/RowWrapper';
import Button from '@/widgets/button/Button';
import styled from 'styled-components';
import { SizedBox } from '@/widgets/wrapper/SizedBox';
import { useRecoilState } from 'recoil';
import { categoryState } from '../model/postAtoms';

const PostCategoryContainer: React.FC = () => {
    // 상태를 단일 선택을 위해 문자열로 변경
    const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);

    // 버튼 클릭 핸들러
    const handleButtonClick = (label: string) => {
        setSelectedCategory(
            (prevCategory) => (prevCategory === label ? '' : label), // 이미 선택된 경우 선택 해제, 아니면 새로운 선택
        );
    };

    // 선택된 카테고리인지 확인하는 함수
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
