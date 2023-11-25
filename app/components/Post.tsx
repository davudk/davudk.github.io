import { PostsBySlug } from "@/app/posts";
import { PostHeader } from "./PostHeader";

export function Post(props: { slug: string }) {
    const { slug } = props;
    const post = PostsBySlug[slug];

    const Component = post.Component ?? (() => <div>Post not found.</div>);

    return (
        <article>
            <div className="prose prose-hr:my-6 prose-headings:my-3 prose-headings:font-normal prose-p:my-3 prose-img:my-3 prose-a:no-underline hover:prose-a:underline">
                <PostHeader post={post} />
                <Component />
            </div>

            {/* < footer class="mt-8" >
                {{> post - navigator}
        }
            </footer > */}
        </article >
    )
}