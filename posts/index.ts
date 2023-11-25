import * as introduction from './2023-11-24-introduction.mdx';

export interface Post {
    Component?: (props: any) => JSX.Element;
    slug: string;
    title: string;
    excerpt: string;
    tags: string[];
    publishedDate: string;
    featureImage?: {
        src: string;
        alt?: string;
    };
}

const entries = [
    introduction
].map(raw => {
    const { default: Component, ...source } = raw;
    const post = { Component, ...source } as Post;

    return [post.slug, post] as const;
}).reverse();

export const PostsBySlug = Object.fromEntries(entries) as Record<string, Post>;

export const Posts = entries.map(([_, p]) => {
    const { Component, ...params } = p;
    return params as Post;
});
