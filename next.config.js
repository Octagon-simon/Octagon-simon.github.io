/** @type {import('next').NextConfig} */

// next.config.js
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    images : {
        unoptimized : true
    },
    trailingSlash: true,  // Add this to ensure all paths have a trailing slash
    // basePath : "/octagon-simon.github.io"
    // async redirects() {
    //     return [
    //         {
    //             source: '/home',
    //             destination: '/',
    //             permanent: true,
    //         },
    //     ];
    // },
}

module.exports = nextConfig
