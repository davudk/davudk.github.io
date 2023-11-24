import { readdir } from 'fs/promises';
import { MDXProps } from 'mdx/types';

export interface Post {
    Component: (props: MDXProps) => JSX.Element;
    slug: string;
    title: string;
    excerpt: string;
    tags: string[];
    published: string;
    featureImage: string;
}

const filenames = (await readdir('posts')).filter(fn => fn.endsWith('.mdx'));

const entries = await Promise.all(filenames.map(async fn => {
    const slug = fn.replace(/^\d{4}-\d{2}-\d{2}-|\.mdx$/g, '');
    const source = await import('./' + fn)
    const post = {
        slug,
        Component: source.default,
        tags: source.tags ?? [],
        published: source.published ?? fn.match(/^\d{4}-\d{2}-\d{2}/)![0],
        ...source
    };

    return [slug, post];
}));

export const Posts = Object.fromEntries(entries) as Record<string, Post>;