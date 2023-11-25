import nextMDX from '@next/mdx';
import remarkCodeTitle from 'remark-code-title';
import remarkPrism from 'remark-prism';
import rehypeSlug from 'rehype-slug';

const withMDX = nextMDX({
    options: {
        remarkPlugins: [remarkCodeTitle, remarkPrism],
        rehypePlugins: [rehypeSlug]
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

export default withMDX(nextConfig)
