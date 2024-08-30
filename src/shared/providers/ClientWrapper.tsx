'use client';

import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactQueryProviders from '@/shared/state/ReactQueryProviders';
import StyledComponentsRegistry from '@/shared/styles/StyledComponentsRegistry';
import AuthContext from '@/app/util/auth/AuthContext';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <RecoilRoot>
            <ReactQueryProviders>
                <AuthContext>
                    <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
                </AuthContext>
            </ReactQueryProviders>
        </RecoilRoot>
    );
}
