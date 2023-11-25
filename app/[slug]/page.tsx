import { Posts } from '@/app/posts';
import { Post } from '../components/Post';

export async function generateStaticParams() {
  return Posts.map(({ slug }) => ({ slug }));
}

export default function PostPage(props: { params: { slug: string } }) {
  const { slug } = props.params;

  return <Post slug={slug} />;
}