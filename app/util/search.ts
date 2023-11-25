import { Post } from '@/app/posts';
import Fuse from 'fuse.js'

export function performSearch(posts: Post[], q: string, limit = 6) {
    const entries = posts.filter(p => !p.doNotIndex);
    const fuse = new Fuse(entries, {
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