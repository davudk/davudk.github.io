import { PostList } from '@/app/components/PostList';
import { Posts } from '@/posts';

export async function generateStaticParams() {
    const tags = new Set<string>();
    Object.values(Posts).map(p => {
        p.tags.forEach(t => tags.add(t));
    });
    return [...tags].sort().map(tag => ({ tag }));
}

export default function TagPage(props: { params: { tag: string } }) {
    const { tag } = props.params;
    const posts = Object.values(Posts).filter(p => p.tags.includes(tag));

    return (
        <div>
            <PostList posts={Object.values(Posts)} tag={tag} />
        </div>
    )
}