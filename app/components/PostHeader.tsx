import { Post } from "@/posts";
import Link from "next/link";

export interface PostHeaderProps {
    post: Post
}

export function PostHeader(props: PostHeaderProps) {
    const { title, excerpt, tags, publishedDate, featureImage } = props.post;

    return (
        <header>
            <h1 className="!my-1 text-4xl text-current">{title}</h1>

            <div className="!my-0 opacity-80">
                <Tags tags={tags} />
                <time dateTime={publishedDate}>{publishedDate}</time>
            </div>

            {excerpt && (
                <p className="!my-0 opacity-90">{excerpt}</p>
            )}

            {featureImage && (
                <img className="!mt-1" src={featureImage.src} alt={featureImage.alt} />
            )}

        </header>
    )
}

function Tags(props: { tags?: string[] }) {
    const { tags } = props;

    if (!tags?.length) return null;

    return (
        <>
            Tagged in:&nbsp;
            {tags.map((t, i) => (
                <span key={t}>
                    {i > 0 && ", "}
                    <Link href={`/tag/${t}`}>{t}</Link>
                </span>
            ))}
            &nbsp;&bull;&nbsp;
        </>
    )
}