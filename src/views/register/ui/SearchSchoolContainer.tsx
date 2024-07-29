import React from 'react';
import { SemiTitle, Title } from './Font';
import Select from '@/widgets/select/Select';
import Input from '@/widgets/input/Input';
import SearchIcon2 from '../../../../public/icons/searchIcon2.svg';
import Button from '@/widgets/button/Button';
import styled from 'styled-components';

const SearchSchoolContainer = () => {
    return (
        <>
            <Title>학교 선택</Title>   
            <Column>
            <SemiTitle>입학연도</SemiTitle>
            <Select size="large" firstValue="연도 선택 (학번)">
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
            </Select>
            </Column>

            <Column>
            <SemiTitle>학교</SemiTitle>
            <Input icon={SearchIcon2} size='large'/>
            </Column>

        </>
    );
};

export default SearchSchoolContainer;

const Column = styled.div`
display : flex;
flex-direction : column;
gap: 0.5em;
`
