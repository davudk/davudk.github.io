import { Posts } from "@/posts";

export function Post(props: { slug: string }) {
    const { slug } = props;
    const post = Posts[slug];

    return (
        <article>
            <p>Slug: {slug}</p>
            <div className="prose">
                <post.Component />
            </div>
            <p>{JSON.stringify(post.tags)}</p>
            <p>{JSON.stringify(post.published)}</p>
        </article>
    )
}