'use client';

import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { authDataState, userSummaryState } from '@/entities/auth/model';
import Header from '@/widgets/header/Header';
import { deleteCookie } from 'cookies-next';
import apiClient from '@/shared/api/apiClient';
import { useRouter } from 'next/navigation';

const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const authData = useRecoilValue(authDataState);
    const resetAuthData = useResetRecoilState(authDataState);
    const resetUserData = useResetRecoilState(userSummaryState);
    const [user, setUser] = useState<{ email?: string } | null>(null);
    const router = useRouter();

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
            localStorage.removeItem('authData');
            localStorage.removeItem('userSummary');
            console.log('localStorage 상태:', localStorage);
            resetAuthData();
            resetUserData();
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            router.refresh();
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
