import React, { useEffect, useState } from 'react';
import { ErrorMessage, SemiTitle, Title } from './Font';
import Input from '@/widgets/input/Input';
import SearchIcon2 from '../../../../public/icons/searchIcon2.svg';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { majorNameState } from '@/views/register/model/register';
import Button from '@/widgets/button/Button';
import { fetchMajors } from '../api/fetchMajors';

interface SearchMajorContainerProps {
    showError?: boolean;
    onNext: (isValid: boolean) => void;
}

interface Major {
    majorId: number;
    majorName: string;
}

const SearchMajorContainer: React.FC<SearchMajorContainerProps> = ({ showError = false, onNext }) => {
    const [majorName, setMajorName] = useRecoilState(majorNameState);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [majors, setMajors] = useState<Major[]>([]);
    const [filteredMajors, setFilteredMajors] = useState<Major[]>([]);

    useEffect(() => {
        const getMajors = async () => {
            try {
                const majorList = await fetchMajors();
                setMajors(majorList);
            } catch (error) {
                console.error('학과 데이터를 가져오는 중 오류 발생:', error);
            }
        };
        getMajors();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredMajors([]);
        } else {
            const filtered = majors.filter((major) => major.majorName.includes(searchTerm));
            setFilteredMajors(filtered.slice(0, 5));
        }
    }, [searchTerm, majors]);

    const handleSearchItem = (major: Major) => {
        setSearchTerm(major.majorName);
        setMajorName(major.majorName);
    };

    const handleNext = () => {
        const isValid = !!majorName;
        onNext(isValid);
    };

    return (
        <>
            <Title>학과 선택</Title>
            <Column2>
                <SemiTitle>학과</SemiTitle>
                <Input
                    icon={SearchIcon2}
                    size="large"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<any>) => setSearchTerm(e.target.value)}
                    placeholder="학과 이름 검색"
                />
                {showError && !majorName && <ErrorMessage>학과를 선택해주세요.</ErrorMessage>}
                {filteredMajors.length > 0 && (
                    <SearchResults>
                        {filteredMajors.map((major) => (
                            <SearchResultItem onClick={() => handleSearchItem(major)} key={major.majorId}>
                                {major.majorName}
                            </SearchResultItem>
                        ))}
                    </SearchResults>
                )}
            </Column2>
            <Button $primary size="wide" label="다음" onClick={handleNext} />
        </>
    );
};

export default SearchMajorContainer;

const Column2 = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    height: 200px;
`;

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
