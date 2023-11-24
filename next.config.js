const withMDX = require('@next/mdx')({
    options: {
        remarkPlugins: [require('remark-prism')],
    }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        siteName: 'Davud\'s blog'
    },
    output: 'export',
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

module.exports = withMDX(nextConfig)
