import { Post } from "@/posts";
import { PostPreview } from "./PostPreview";

export interface PostListProps {
    posts: Post[];
    tag?: string;
}

export function PostList(props: PostListProps) {
    const { posts, tag } = props;

    if (posts.length === 0) {
        return (
            <p>No posts found.</p>
        )
    }

    const prefix = tag ? `Posts in topic: ${tag}` : 'Posts';

    const countMessage = posts.length > 1
        ? `${posts.length} in total`
        : `just one`;

    return (
        <div>
            <h1 className="mb-4 text-xl">{prefix} ({countMessage})</h1>
            {posts.map(p => <PostPreview key={p.slug} post={p} />)}
        </div>
    )
}