import React from 'react';
import { SemiTitle, Title } from './Font';
import Input from '@/widgets/input/Input';
import SearchIcon2 from '../../../../public/icons/searchIcon2.svg';
import styled from 'styled-components';

const SelectDepartmentContainer = () => {
    return (
        <>
            <Title>학과 선택</Title>   
            <Column>
            <SemiTitle>학과</SemiTitle>
            <Input icon={SearchIcon2} size='large' placeholder='학과 이름을 검색해주세요'/>
            </Column>
        </>
    );
};

export default SelectDepartmentContainer;

const Column = styled.div`
display : flex;
flex-direction : column;
gap: 0.5em;
`
