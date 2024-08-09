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
    env: {
        NEXT_PUBLIC_TOSS_CLIENT_KEY: process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY,
        NEXT_PUBLIC_TOSS_SECERET_KEY: process.env.NEXT_PUBLIC_TOSS_SECERET_KEY
    },
    // webpack(config) {
    //     config.module.rules.push({
    //         test: /\.svg$/,
    //         use: ["@svgr/webpack"]
    //         });
        
    //     return config;
    // }
};


export default nextConfig;

