/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import CategoryLinkSection from 'src/components/category-link';
import RightPane from 'src/components/right-pane';
import SkillPane from 'src/components/skill-pane';
import SkillsList from 'src/components/skills-list';
import { LayoutProvider } from 'src/context/layout-context';
import { getAllPosts } from 'src/helpers/page-fetcher';
import { parseDates } from 'src/helpers/utils';
import {
  IdCard,
  Metadata,
  PostInfo,
  Role,
  RoleWithSkills,
  WorkExperience,
} from '../models/interfaces';

// eslint-disable-next-line import/no-unresolved
import Layout from '../components/layout';
import { getDataFile, getDataFiles } from '../helpers/data-fetchers';

export interface IndexParams {
  idCard: IdCard;
  allRoles: Array<Role>;
  allWorkExperience: Array<WorkExperience>;
}

export default function Index({
  data,
  metadata,
  posts,
}: {
  data: IndexParams;
  metadata: Metadata;
  posts: Array<PostInfo>;
}) {
  const experience = parseDates(data.allWorkExperience);
  // const result = { identification, roles, experience };

  const rolesWithSkills: Array<RoleWithSkills> = posts.map(post => ({
    role: post.frontmatter?.title,
    skills: post.frontmatter?.skills,
  }));

  return (
    <Layout data={metadata}>
      <div>
        <p style={{ color: 'white', textAlign: 'center', paddingTop: '1em' }}>
          I am a full-stack developer with experience with JavaScript, Java and multiple frameworks.
          I currently work at LinkedIn
        </p>
        <p style={{ color: 'white', textAlign: 'center', paddingTop: '1em' }}>
          Choose a role to know more about my experience.
        </p>
        <CategoryLinkSection posts={posts} />

        <div className="flex-centered">
          <div>
            <p style={{ color: 'white' }} className={['pv-1', 'text-align-center'].join(' ')}>
              Or, choose a skill to see related experience.
            </p>

            <LayoutProvider>
              <div className="flex-centered">
                <SkillsList roles={rolesWithSkills} />

                <SkillPane experience={experience} />
              </div>
            </LayoutProvider>
          </div>

          <RightPane />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const idCard: IdCard = await getDataFile('src/data/idCard/idCard.json');
  const allRoles: Array<Role> = await getDataFiles('src/data/roles/');
  const metadata: Metadata = await getDataFile('src/data/metadata.json');

  const posts: Array<PostInfo> = getAllPosts();

  const allWorkExperience: Array<WorkExperience> = await getDataFiles('src/data/workExperience/');
  const data: IndexParams = { idCard, allRoles, allWorkExperience };
  return {
    props: {
      posts,
      data,
      metadata,
    },
  };
}
