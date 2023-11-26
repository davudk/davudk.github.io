import { PostsBySlug } from "@/posts";
import { PostHeader } from "./PostHeader";

export function Post(props: { slug: string }) {
    const { slug } = props;
    const post = PostsBySlug[slug];

    const Component = post.Component ?? (() => <div>Post not found.</div>);

    return (
        <article className="prose prose-hr:my-6 prose-headings:my-3 prose-headings:font-normal prose-p:my-3 prose-img:my-3 prose-a:no-underline hover:prose-a:underline
                            dark:text-slate-200 prose-headings:text-black dark:prose-headings:text-slate-100 prose-a:text-sky-600 dark:prose-a:text-rose-300
                            dark:prose-code:text-slate-200">
            <PostHeader post={post} />
            <Component />
        </article >
    )
}