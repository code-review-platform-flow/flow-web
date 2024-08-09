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
        TOSS_CLIENT_KEY: process.env.TOSS_CLIENT_KEY,
        TOSS_SECRET_KEY: process.env.TOSS_SECRET_KEY
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

