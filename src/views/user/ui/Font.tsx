import styled from "styled-components";
import React from 'react';

interface YearTitleProps {
    children?: React.ReactNode;
}

const YearTitle: React.FC<YearTitleProps> = ({ children }) => {
    return (
        <Title>
            <Retangle/>{children}
        </Title>
    );
};


const Title = styled.div`
    display : flex;
    align-items : center;
    gap : 0.5em;
    color : #999999;
    font-size : 0.8125em;
`

const SemiTitle = styled.div`
    font-size : 0.875em;
    font-weight : 600;
    color: #3333333;
`

const Retangle = styled.div`
    border-radius : 100%;
    width : 0.5em;
    height : 0.5em;
    background-color : #D9D9D9;
`

const YearDescription = styled.div`
    font-weight : 500;
    font-size : 0.9375em;
`
const UserDepartmentEnterYear = styled.div`
    color : #999999;
    font-size : 0.8125em;
`

export { UserDepartmentEnterYear,YearDescription,SemiTitle, YearTitle};