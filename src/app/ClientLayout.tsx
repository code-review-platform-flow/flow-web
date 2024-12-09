'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { authDataState, userSummaryState } from '@/entities/auth/model';
import Header from '@/widgets/header/Header';
import { deleteCookie } from 'cookies-next';
import apiClient from '@/shared/api/apiClient';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const authData = useRecoilValue(authDataState);
    const resetAuthData = useResetRecoilState(authDataState);
    const resetUserData = useResetRecoilState(userSummaryState);
    const email = authData?.email;
    const [user, setUser] = useState<{ email?: string } | null>(null);

    useEffect(() => {
        if (authData) {
            setUser({ email: authData.email });
        } else {
            setUser(null);
        }
    }, [authData]);

    const handleLogout = async () => {
        try {
            await apiClient.delete('auth/logout');

            deleteCookie('accessToken');
            deleteCookie('refreshToken');

            localStorage.removeItem('authData');
            resetAuthData();
            resetUserData();

            window.location.reload();
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };

    return (
        <>
            <Header user={user!} onLogout={handleLogout} />
            {children}
        </>
    );
};

export default ClientLayout;
