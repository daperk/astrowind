import { fetchPosts } from '~/utils/blog';
import { getPermalink } from '~/utils/permalinks';

export const GET = async () => {
  const posts = await fetchPosts();

  const index = posts.map((post) => ({
    title: post.title,
    excerpt: post.excerpt ?? '',
    url: getPermalink(post.permalink, 'post'),
    category: post.category?.title ?? '',
    tags: Array.isArray(post.tags) ? post.tags.map((tag) => tag.title) : [],
  }));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
