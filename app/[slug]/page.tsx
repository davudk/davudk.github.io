import { Posts } from '@/posts';
import { Post } from '../components/Post';

export async function generateStaticParams() {
  return Object.keys(Posts).map(slug => ({ slug }));
}

export default function Page(props: { params: { slug: string } }) {
  const { slug } = props.params;

  return <Post slug={slug} />;
}