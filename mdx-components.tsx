import type { MDXComponents } from 'mdx/types'
import { PostHeader } from './app/components/PostHeader'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    PostHeader,
    ...components,
  }
}