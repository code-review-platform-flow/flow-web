import React, { useState } from 'react';
import Input from '@/widgets/input/Input';
import { useRecoilState } from 'recoil';
import { tagsState } from '../model/postAtoms';
import styled from 'styled-components';
import CrossIcon from '/public/icons/crossIcon.svg';
import Image from 'next/image';
import { Tag } from '@/shared/type/post';
import Container from '@/widgets/container/Container';
import { PostWriteTitle } from './Font';
import { SizedBox } from '@/widgets/wrapper/SizedBox';

const PostTagContainer: React.FC = ({}) => {
    const [tags, setTags] = useRecoilState(tagsState);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            const newTag: Tag = {
                tagName: inputValue.trim(),
            };

            setTags([...tags, newTag]);
            setInputValue(''); // 입력 후 input 비우기
        }
    };

    const handleTagDelete = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index); // 클릭된 인덱스의 태그 제거
        setTags(newTags);
    };

    return (
        <Container size="wide">
            <PostWriteTitle>태그</PostWriteTitle>
            <SizedBox />
            {/* 입력된 태그 리스트 출력 */}
            <TagList>
                {tags.map((tag, index) => (
                    <TagItem key={index} style={{ marginRight: '8px' }} onClick={() => handleTagDelete(index)}>
                        #{tag.tagName}
                        <Image src={CrossIcon} alt="삭제아이콘" />
                    </TagItem>
                ))}
                <Input
                    size="large"
                    backgroundColor="none"
                    border={false}
                    placeholder="태그를 입력해주세요!"
                    lowround
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleInputKeyPress}
                />
            </TagList>
        </Container>
    );
};

export default PostTagContainer;

const TagList = styled.div`
    display: flex;
    width: 100%;
    border: solid 1px #ededed;
    border-radius: 0.5em;
    padding: 0.5625em;
    box-sizing: border-box;
`;

const TagItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25em;
    box-sizing: border-box;
    background: #f5f5f5;
    border: 1px solid #f9f9f9;
    border-radius: 0.5em;
    padding: 0.5em;
    font-weight: 400;
    font-size: 0.8125em;
    color: #8e8e8e;
    width: auto;
    cursor: pointer;
`;
