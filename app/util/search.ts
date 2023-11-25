import { Post } from '@/posts';
import Fuse from 'fuse.js'

export function performSearch(posts: Post[], q: string, limit = 6) {
    const fuse = new Fuse(posts, {
        // isCaseSensitive: false,
        // includeScore: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
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