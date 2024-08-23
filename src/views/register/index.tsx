'use client'
import React, { useState } from "react";
import { FillWrapper } from '@/widgets/wrapper/FillWrapper';
import SearchSchoolContainer from "./ui/SearchSchoolContainer";
import SelectDepartmentContainer from "./ui/SelectDepartmentContainer";
import UserInfoContainer from "./ui/UserInfoContainer";
import RegisterContainer from "./ui/RegisterContainer";
import { redirect } from 'next/navigation'

const RegisterPage: React.FC = () => {

    const [register, setRegister] = useState(0);
    const [showError, setShowError] = useState(false);
    const [registerCheck, setRegisterCheck] = useState(false);

    const handleRegister = (isValid: boolean) => {
        if (!isValid) {
            setShowError(true);
            return;
        }

        setShowError(false);

        if (register < 2) {
            setRegister(prev => prev + 1);
        } else {
            setRegisterCheck(true);

        }

        if (register == 2  
            // && registerCheck == true
        ){
            console.log('회원가입 성공')
            redirect('/')
        }
    };

    return (
        <FillWrapper>
            <RegisterContainer>
                {register === 0 && <SearchSchoolContainer showError={showError} onNext={(isValid) => handleRegister(isValid)} />}
                {register === 1 && <SelectDepartmentContainer showError={showError} onNext={(isValid) => handleRegister(isValid)} />}
                {register === 2 && <UserInfoContainer showError={showError} registerCheck={registerCheck} onNext={(isValid) => handleRegister(isValid)} />}
            </RegisterContainer>
        </FillWrapper>
    );
}

export default RegisterPage;
