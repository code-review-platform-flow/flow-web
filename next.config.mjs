/** @type {import('next').NextConfig} */
const nextConfig = {
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
            {
                source: '/api/:path*',
                destination: '/api/:path*'
            },
        ];
    },
    env: {
        NEXT_PUBLIC_TOSS_CLIENT_KEY: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
        NEXT_PUBLIC_TOSS_SECRET_KEY: process.env.NEXT_PUBLIC_TOSS_SECRET_KEY,
        NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        // NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL
    },

};

export default nextConfig;
