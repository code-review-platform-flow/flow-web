import styled from 'styled-components';
import React from 'react';

interface YearTitleProps {
    children?: React.ReactNode;
    width?: string;
}

const YearTitle: React.FC<YearTitleProps> = ({ children, width }) => {
    return (
        <Title width={width}>
            <Retangle />
            {children}
        </Title>
    );
};

const Title = styled.div<{ width?: string }>`
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: #999999;
    font-size: 0.8125em;
    width: ${(props) => props.width};
`;
const SemiTitle = styled.div`
    font-size: 0.875em;
    font-weight: 600;
    color: #3333333;
`;

const Retangle = styled.div`
    border-radius: 100%;
    width: 0.5em;
    height: 0.5em;
    background-color: #d9d9d9;
`;

const YearDescription = styled.div`
    font-weight: 500;
    font-size: 0.9375em;
`;
const UserDepartmentEnterYear = styled.div`
    color: #999999;
    font-size: 0.8125em;
`;

export { UserDepartmentEnterYear, YearDescription, SemiTitle, YearTitle };
