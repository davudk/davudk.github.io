import { Posts } from '@/posts'
import { PostList } from './components/PostList'

export default function Home() {
  return (
    <main>
      <PostList posts={Object.values(Posts)} />
    </main>
  )
}
