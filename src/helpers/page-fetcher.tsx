// Install gray-matter and date-fns
import matter from 'gray-matter';
import { parseISO, format } from 'date-fns';
import fs from 'fs';
import { join } from 'path';
import { PostInfo } from 'src/models/interfaces';

// Add markdown files in `src/content/blog`
const postsDirectory = join(process.cwd(), 'src', 'content');

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const date = format(parseISO(data.date), 'MMMM dd, yyyy');
  const { title, description, order, hero_image, hero_image_alt, skills } = data;
  skills.sort();

  return {
    slug: realSlug,
    frontmatter: {
      title,
      description,
      order,
      hero_image,
      hero_image_blur: `blur_${hero_image.slice(1)}`,
      hero_image_alt,
      skills,
      date,
    },
    content,
  };
}

export function getAllPosts() {
  const slugs = fs.readdirSync(postsDirectory);
  const posts: Array<PostInfo> = slugs.map(slug => getPostBySlug(slug));

  posts.sort((a, b) => a.frontmatter.order - b.frontmatter.order);

  return posts;
}
