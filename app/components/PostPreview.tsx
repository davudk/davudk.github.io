import { Post } from "@/posts";
import Image from "next/image";
import Link from "next/link";

export function PostPreview(props: { post: Post }) {
    const { slug, title, excerpt, publishedDate, featureImage } = props.post;

    return (
        <Link className="group flex flex-col sm:flex-row" href={`/${slug}`}>
            <div className="max-h-40 sm:w-48 sm:max-h-auto bg-slate-300">
                {featureImage && (
                    <Image src={featureImage.src} alt={featureImage.alt ?? ''} />
                )}
            </div>
            <div className="mt-1 mb-3 sm:my-0 sm:ml-3 flex-1">
                <h2 className="text-lg group-hover:underline">{title}</h2>
                <div className="text-xs text-slate-600"><time dateTime={publishedDate}>{publishedDate}</time>
                </div>
                <p className="mt-1 text-sm text-slate-800 text-ellipsis line-clamp-3">{excerpt}</p>
            </div>
        </Link>
    )
}