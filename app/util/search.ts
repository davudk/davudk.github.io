import { Post } from '@/posts';
import Fuse from 'fuse.js'

export function performSearch(posts: Post[], q: string, limit = 6) {
    const fuse = new Fuse(posts, {
        keys: [
            "title",
            "excerpt",
            "tags",
            "published"
        ]
    });

    const res = fuse.search(q, { limit });
    return res.map(r => r.item);
}