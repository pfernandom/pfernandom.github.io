/* eslint-disable react/no-danger */
// Install remark and remark-html
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { remark } from 'remark';
import html from 'remark-html';
import { ExperienceSection } from 'src/components/experience/experience-element';
import Layout from 'src/components/layout';
import { getAllPosts, getPostBySlug } from 'src/helpers/page-fetcher';
import { getDataFile, getDataFiles } from 'src/helpers/data-fetchers';
import { mapBySkillsSet, parseDates } from 'src/helpers/utils';
import { Metadata, WorkExperience } from 'src/models/interfaces';
import { PageInfo } from './_app';

type SlugDataParams = {
  allWorkExperience: Array<WorkExperience>;
};

interface SlugPageInfo extends PageInfo {
  data: SlugDataParams;
}

export default function PostPage({
  content,
  metadata,
  post,
  data: { allWorkExperience },
}: SlugPageInfo) {
  const skillsSet = new Set(post.frontmatter.skills);
  const experience = parseDates(allWorkExperience).map(mapBySkillsSet(skillsSet));
  return (
    <Layout data={metadata}>
      <>
        <div style={{ position: 'relative', backgroundColor: 'black' }}>
          <div className="category__hero-wrapper">
            <Image
              src={post.frontmatter.hero_image}
              alt="Picture of the author"
              objectFit="cover"
              layout="responsive"
              placeholder="blur"
              blurDataURL={post.frontmatter.hero_image_blur}
              width="100%"
              height={37}
            />
          </div>
          <h2 className="role-page-title">{post.frontmatter.title}</h2>
        </div>
        <div className="role-page-content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <AnimatePresence>
            <ExperienceSection experience={experience} />
          </AnimatePresence>
        </div>
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
  const data: SlugDataParams = { allWorkExperience };

  const pageInfo: PageInfo = {
    post,
    content,
    data,
    metadata,
  };

  return {
    props: pageInfo,
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
