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
        VITE_TOSS_CLIENT_KEY: 'test_ck_0RnYX2w5327goRzl1J1RVNeyqApQ',
        VITE_TOSS_SECERET_KEY: 'test_sk_yL0qZ4G1VOdD0aBmoE0kroWb2MQY'
    },
};


export default nextConfig;

