import React from 'react';
import { ErrorMessage, SemiTitle, Title } from './Font';
import Input from '@/widgets/input/Input';
import SearchIcon2 from '../../../../public/icons/searchIcon2.svg';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { majorNameState } from '@/app/util/register/register';
import Button from '@/widgets/button/Button';

interface SelectDepartmentContainerProps {
    showError?: boolean;
    onNext: (isValid: boolean) => void;
}

const SelectDepartmentContainer: React.FC<SelectDepartmentContainerProps> = ({ showError = false, onNext }) => {
    const [department, setDepartment] = useRecoilState(departmentState);

    const handleSearchItem = (department?: string) => {
        setDepartment(department || '');
    };

    const handleNext = () => {
        const isValid = !!majorName;
        onNext(isValid);
    };

    return (
        <>
            <Title>학과 선택</Title>
            <Column>
                <SemiTitle>학과</SemiTitle>
                <Input
                    icon={SearchIcon2}
                    value={department}
                    size="large"
                    placeholder="학과 이름을 검색해주세요"
                    onChange={(e: React.ChangeEvent<any>) => handleSearchItem(e.target.value)}
                />
                {showError && !majorName && <ErrorMessage>학과를 선택해주세요.</ErrorMessage>}
            </Column>
            <ButtonWrapper>
                <Button $primary size="wide" label="다음" onClick={handleNext} />
            </ButtonWrapper>
        </>
    );
};

export default SelectDepartmentContainer;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;

const ButtonWrapper = styled.div`
    margin-top: 2em;
    display: flex;
    justify-content: flex-end;
`;
