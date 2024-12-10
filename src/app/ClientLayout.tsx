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
        } catch (error) {
            console.error('로그아웃 요청 실패:', error);
        } finally {
            resetAuthData();
            resetUserData();
            localStorage.removeItem('authData');
            localStorage.removeItem('userSummary');
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            window.location.reload();
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
