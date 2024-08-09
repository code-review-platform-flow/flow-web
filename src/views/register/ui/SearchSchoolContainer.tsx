import React from 'react';
import { SemiTitle, Title } from './Font';
import Select from '@/widgets/select/Select';
import Input from '@/widgets/input/Input';
import SearchIcon2 from '../../../../public/icons/searchIcon2.svg';
import styled from 'styled-components';

const SearchSchoolContainer = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);

    return (
        <>
            <Title>학교 선택</Title>   
            <Column>
                <SemiTitle>입학연도</SemiTitle>
                <StyledSelect size="large" firstValue="연도 선택 (학번)">
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </StyledSelect>
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
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

const StyledSelect = styled(Select)`

`;
