'use client';

import dynamic from 'next/dynamic';

const ReactQueryProviders = dynamic(
    () => import('./ReactQueryProvidersBase').then((mod) => mod.ReactQueryProvidersBase),
    { ssr: false },
);

export default ReactQueryProviders;
