/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'electricenjin.com',
                port: '',
                pathname: '/img/cms/workimageassets/**',
            },
        ],
    },
}

module.exports = nextConfig
