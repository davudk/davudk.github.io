import { Post, Posts } from "@/app/posts";
import Link from "next/link";

export function PostPreview(props: { post: Post }) {
    const { post } = props;

    return (
        <Link className="group flex flex-col sm:flex-row" href={`/${post.slug}`}>
            <div className="max-h-40 sm:w-48 sm:max-h-auto bg-slate-300">
                {post.featureImage && (
                    <img src={post.featureImage} alt={post.title} />
                )}
            </div>
            <div className="mt-1 mb-3 sm:my-0 sm:ml-3 flex-1">
                <h2 className="text-lg group-hover:underline">{post.title}</h2>
                <div className="text-xs text-slate-600"><time dateTime={post.published}>{post.published}</time>
                </div>
                <p className="mt-1 text-sm text-slate-800 text-ellipsis line-clamp-3">{post.excerpt}</p>
            </div>
        </Link>
    )
}