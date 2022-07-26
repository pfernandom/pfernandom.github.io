export interface Contact {
  icon: string;
  link: string;
  text: string;
  print: boolean;
}

export interface Role {
  id?: number;
  title: string;
  tags: Array<string>;
}

export interface IdCard {
  name: string;
  role: string;
  graduationDate: string;
  summary: string;
  highlights: Array<string>;
  contact: Array<Contact>;
}

export interface Responsibility {
  summary?: string;
  content: string;
  categories: Array<string>;
}

export interface WorkExperience {
  id?: number;
  project: string;
  startDate: string | Date;
  endDate: string | Date;
  startYear: string;
  role: string;
  description: string;
  tags: Array<string>;
  responsibilities: Array<Responsibility>;
  content?: string;
}

export interface Metadata {
  title: string;
  description: string;
  author: string;
}

export interface Post {
  title: string;
  date: string;
  description: Array<string>;
  hero_image: string;
  hero_image_blur: string;
  hero_image_alt: string;
  skills: Array<string>;
}

export interface PostInfo {
  slug: string;
  frontmatter: Post;
  content: string;
}

export interface RoleWithSkills {
  role: string;
  skills: Array<string>;
}
