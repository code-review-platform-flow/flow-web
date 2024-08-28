const nextConfig = {
    images: {
        domains: ['storage.googleapis.com'], 
    },
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
            {
                source: '/api/:path*',
                destination: 'http://localhost:8080/:path*',
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
