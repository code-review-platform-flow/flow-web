'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { authDataState } from '@/entities/auth/model';
import Header from '@/widgets/header/Header';
import { deleteCookie } from 'cookies-next';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const authData = useRecoilValue(authDataState);
    const resetAuthData = useResetRecoilState(authDataState);
    const email = authData?.email;
    const [user, setUser] = useState<{ email?: string } | null>(null);

    useEffect(() => {
        if (authData) {
            setUser({ email: authData.email });
        } else {
            setUser(null);
        }
    }, [authData]);

    const onLogout = () => {
        deleteCookie('authData');
        localStorage.removeItem('authData');
        resetAuthData();
    };

    return (
        <>
            <Header user={user!} onLogout={onLogout} />
            {children}
        </>
    );
};

export default ClientLayout;
