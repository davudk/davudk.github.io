import { Post } from "@/posts";

export interface PostHeaderProps {
    post: Post
}

export function PostHeader(props: PostHeaderProps) {
    const { title, excerpt, tags, published, featureImage } = props.post;

    return (
        <header>
            <h1 className="!my-1 text-4xl text-rose-800">{title}</h1>

            <div className="!my-0 text-slate-600">
                <Tags tags={tags} />
                <time dateTime={published}>{published}</time>
            </div>

            {excerpt && (
                <p className="!my-0 text-slate-800">{excerpt}</p>
            )}

            {featureImage && (
                <img className="!mt-1" src={featureImage} />
            )}

        </header>
        // <header className="mb-4 flex flex-col gap-y-2">
        //     <h1 className="text-4xl">{title}</h1>

        //     <div className="text-sm text-slate-600">
        //         {(tags ?? []).map(tag => <div>{tag}</div>)}
        //         <time dateTime={published}>{published}</time>
        //     </div>

        //     {excerpt && (
        //         <p className="text-slate-800">{excerpt}</p>
        //     )}

        // </header>
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
                    <a href={`/tag/${t}`}>{t}</a>
                </span>
            ))}
            &nbsp;&bull;&nbsp;
        </>
    )
    // {!!(tags ?? []).length && (
    //     <>
    //         Tagged in: 
    //         {tags?.map(t => <span>{t}, </span>)}
    //     </>
    // )}
    // {(tags ?? []).map(tag => <span>{tag}</span>)}
}