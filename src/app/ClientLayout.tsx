'use client';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { authDataState } from '@/entities/auth/model';
import Header from '@/widgets/header/Header';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const authData = useRecoilValue(authDataState);
    const email = authData?.email;

    return (
        <>
            <Header user={{ email }} />
            {children}
        </>
    );
};

export default ClientLayout;
