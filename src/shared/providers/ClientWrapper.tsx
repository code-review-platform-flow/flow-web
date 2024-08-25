'use client';

import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactQueryProviders from '@/shared/state/ReactQueryProviders';
import StyledComponentsRegistry from '@/shared/styles/StyledComponentsRegistry';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <RecoilRoot>
            <ReactQueryProviders>
                <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </ReactQueryProviders>
        </RecoilRoot>
    );
}
