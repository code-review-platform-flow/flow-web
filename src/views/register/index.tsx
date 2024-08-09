'use client'

import React, { useState } from "react";
import { FillWrapper } from '@/widgets/wrapper/FillWrapper';
import SearchSchoolContainer from "./ui/SearchSchoolContainer";
import SelectDepartmentContainer from "./ui/SelectDepartmentContainer";
import UserInfoContainer from "./ui/UserInfoContainer";
import RegisterContainer from "./ui/RegisterContainer";
import Button from "@/widgets/button/Button";
import styled from "styled-components";


const RegisterPage: React.FC = () => {
    const [register, setRegister] = useState(0);

    //임시구현
    const handleRegister = () => {
        setRegister((prev) => (prev + 1) % 3);
    }
    
    return (
        <FillWrapper>
            <RegisterContainer>
                {register === 0 && <SearchSchoolContainer/>}
                {register === 1 && <SelectDepartmentContainer />}
                {register === 2 && <UserInfoContainer />}
                <ButtonWrapper>
                    <Button $primary  onClick={()=>handleRegister()}  size='wide' label={register === 2 ? '회원가입 완료' : '다음'}/>
                </ButtonWrapper>
            </RegisterContainer>
        </FillWrapper>
    );
}

export default RegisterPage;

const ButtonWrapper = styled.div`
    margin-top : 2em;
`;