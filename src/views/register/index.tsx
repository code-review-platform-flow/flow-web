'use client';
import React, { useEffect, useState } from 'react';
import { FillWrapper } from '@/widgets/wrapper/FillWrapper';
import SearchSchoolContainer from './ui/SearchSchoolContainer';
import SelectDepartmentContainer from './ui/SearchMajorContainer';
import RegsiterForm from './ui/RegsiterForm';
import RegisterContainer from './ui/RegisterContainer';
import { redirect } from 'next/navigation';

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
            setRegister((prev) => prev + 1);
        } else {
            setRegisterCheck(true);
        }
    };

    useEffect(() => {
        if (register === 2 && registerCheck) {
            redirect('/login');
        }
    }, [register, registerCheck]);

    return (
        <FillWrapper>
            <RegisterContainer>
                {register === 0 && (
                    <SearchSchoolContainer showError={showError} onNext={(isValid) => handleRegister(isValid)} />
                )}
                {register === 1 && (
                    <SelectDepartmentContainer showError={showError} onNext={(isValid) => handleRegister(isValid)} />
                )}
                {register === 2 && (
                    <RegsiterForm
                        showError={showError}
                        registerCheck={registerCheck}
                        onNext={(isValid) => handleRegister(isValid)}
                    />
                )}
            </RegisterContainer>
        </FillWrapper>
    );
};

export default RegisterPage;
