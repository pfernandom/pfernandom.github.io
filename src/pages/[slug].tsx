/* eslint-disable react/no-danger */
// Install remark and remark-html
import React, { useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from 'src/helpers/blog';
import Layout from 'src/components/layout';
import { getDataFile, getDataFiles } from 'src/helpers/data';
import { Metadata, Post, WorkExperience } from 'src/models/data';
import { AnimatePresence, motion } from 'framer-motion';
import ExperienceElement, { ExperienceSection } from 'src/components/experience/experience-element';
import { filterLatestProjects, parseDates, mapBySkillsSet } from 'src/helpers/utils';

type SlugParams = {
  content: string;
  metadata: Metadata;
  post: Post;
  allWorkExperience: Array<WorkExperience>;
};

export default function PostPage({ content, metadata, post, allWorkExperience }: SlugParams) {
  const skillsSet = new Set(post.skills);
  const experience = parseDates(allWorkExperience).map(mapBySkillsSet(skillsSet));

  return (
    <Layout data={metadata}>
      <>
        <div style={{ position: 'relative', backgroundColor: 'black' }}>
          <div className="category__hero-wrapper">
            <Image
              src={post.hero_image}
              alt="Picture of the author"
              objectFit="cover"
              layout="responsive"
              width="100%"
              height={37}
            />
          </div>
          <h2 className="role-page-title">{post.title}</h2>
        </div>
        <div style={{ paddingTop: '1em' }} dangerouslySetInnerHTML={{ __html: content }} />
        <AnimatePresence>
          <ExperienceSection experience={experience} />
        </AnimatePresence>
      </>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  const markdown = await remark()
    .use(html)
    .process(post.content || '');
  const content = markdown.toString();

  const metadata: Metadata = await getDataFile('src/data/metadata.json');

  const allWorkExperience: Array<WorkExperience> = await getDataFiles('src/data/workExperience/');

  return {
    props: {
      ...post,
      post: post.frontmatter,
      content,
      metadata,
      allWorkExperience,
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
