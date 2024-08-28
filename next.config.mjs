/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com','static.wanted.co.kr','cdn.jumpit.co.kr','grepp-programmers.s3.amazonaws.com'], 
    },
    swcMinify: true,
    reactStrictMode: false,
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
            {
                source: '/:path*',
                destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
            },
        ];
    },
    env: {
        NEXT_PUBLIC_TOSS_CLIENT_KEY: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
        NEXT_PUBLOC_TOSS_SECRET_KEY: process.env.NEXT_PUBLOC_TOSS_SECRET_KEY,
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    },
};

export default nextConfig;
