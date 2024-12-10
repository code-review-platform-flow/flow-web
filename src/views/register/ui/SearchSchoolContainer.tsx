import React, { useEffect, useState } from 'react';
import { ErrorMessage, SemiTitle, Title } from './Font';
import Select from '@/widgets/select/Select';
import Input from '@/widgets/input/Input';
import SearchIcon2 from '../../../../public/icons/searchIcon2.svg';
import styled from 'styled-components';
import schoolData from '../model/school.json';
import { useRecoilState } from 'recoil';
import { enterYearState, schoolNameState } from '@/views/register/model/register';
import Button from '@/widgets/button/Button';

interface SearchSchoolContainerProps {
    showError?: boolean;
    onNext: (isValid: boolean) => void;
}

const SearchSchoolContainer: React.FC<SearchSchoolContainerProps> = ({ showError = false, onNext }) => {
    const [schoolName, setSchoolName] = useRecoilState(schoolNameState);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredSchools, setFilteredSchools] = useState<string[]>([]);
    const schoolNames = schoolData.schoolNames;

    const handleSearchItem = (school?: string) => {
        setSearchTerm(school || '');
        setSchoolName(school || '');
    };

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSchools([]);
        } else {
            const filtered = schoolNames.filter((school) => school.includes(searchTerm));
            setFilteredSchools(filtered.slice(0, 5));
        }
    }, [schoolNames, searchTerm]);

    const handleNext = () => {
        const isValid = !!schoolName;
        onNext(isValid);
    };

    return (
        <>
            <Title>학교 선택</Title>

            <Column2>
                <SemiTitle>학교</SemiTitle>
                <Input
                    icon={SearchIcon2}
                    size="large"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<any>) => setSearchTerm(e.target.value)}
                    placeholder="학교 이름 검색"
                />
                {showError && !schoolName && <ErrorMessage>학교를 선택해주세요.</ErrorMessage>}
                {filteredSchools.length > 0 && (
                    <SearchResults>
                        {filteredSchools.map((school, index) => (
                            <SearchResultItem onClick={() => handleSearchItem(school)} key={index}>
                                {school}
                            </SearchResultItem>
                        ))}
                    </SearchResults>
                )}
            </Column2>
            <Button $primary size="wide" label="다음" onClick={handleNext} />
        </>
    );
};

export default SearchSchoolContainer;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

const Column2 = styled(Column)`
    height: 200px;
`;

const StyledSelect = styled(Select)``;

const SearchResults = styled.div`
    font-size: 0.8125em;
    margin-top: 0.5em;
    border-radius: 4px;
    max-height: 150px;
    overflow-y: auto;

    background-color: #fff;
`;

const SearchResultItem = styled.div`
    padding: 0.5em;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;
