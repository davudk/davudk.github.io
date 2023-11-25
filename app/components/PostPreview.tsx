import { Post } from "@/posts";
import Link from "next/link";

export function PostPreview(props: { post: Post }) {
    const { slug, title, excerpt, publishedDate, featureImage } = props.post;

    return (
        <Link className="mb-4 group flex flex-col sm:flex-row" href={`/${slug}`}>
            <div className="h-24 sm:w-48 sm:max-h-auto flex items-center justify-center bg-black/20 overflow-y-hidden">
                {featureImage && (
                    <img src={featureImage.src} alt={featureImage.alt} />
                )}
            </div>
            <div className="mt-1 mb-3 sm:my-0 sm:ml-3 flex-1">
                <h2 className="text-lg group-hover:underline">{title}</h2>
                <div className="text-xs opacity-80"><time dateTime={publishedDate}>{publishedDate}</time>
                </div>
                <p className="mt-1 text-sm opacity-90 text-ellipsis line-clamp-3">{excerpt}</p>
            </div>
        </Link>
    )
}