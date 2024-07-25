import { config } from 'dotenv';
import { resolve } from 'path';

const envFilePathMap = {
    development: 'config/development.env',
    production: 'config/production.env',
};

const currentEnv = process.env.NODE_ENV || 'development';
const envFilePath = envFilePathMap[currentEnv];

if (!envFilePath) {
    throw new Error(`No environment file found for NODE_ENV=${currentEnv}`);
}

config({ path: resolve(process.cwd(), envFilePath) });

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    compiler: {
        styledComponents: {
            ssr: true,
            displayName: true,
        },
    },
    async rewrites() {
        return [
            {
                source: '/storybook',
                destination: '/storybook-static/index.html',
            },
            {
                source: '/storybook/:path*',
                destination: '/storybook-static/:path*',
            },
        ];
    },
    env: {},
};

export default nextConfig;
