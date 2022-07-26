/* eslint-disable import/no-unresolved */
import React from 'react';

import { IndexParams } from 'pages';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { getDataFile, getDataFiles } from '../helpers/data';
import { IdCard, Metadata, Role, WorkExperience } from '../models/data';

function SecondPage({ metadata }: { metadata: Metadata }) {
  return (
    <Layout data={metadata}>
      <div className="about">
        <SEO title="About Pedro" />
        <h1 className="about-page-title">About me...</h1>
        <p>
          I am a full-stack software developer with a Master of Science in Computer Science and
          Machine Learning. I have more than 10 years of professional experience in multiple roles
          that cover application security, back-end, front-end development, and infrastructure
          development. I currently work as a full-stack engineer at LinkedIn.
        </p>
        <h2>Preferred Tech Stack</h2>
        <p>
          While most of my experience is working on JavaScript and Java, I&apos;ve developed and
          interest in coding languages like Dart, Go and Rust.
        </p>
        <p>
          I enjoy systems design. I&apos;m very interested in distributed systems, and while
          database management is not my strong suit, data management is of great interest to me.
        </p>
        <h2>Personal Interests</h2>
        <p>
          I love spending time with my family, reading about software development, movies, TV shows
          and video games.
        </p>
        <p>I like cooking BBQ Texas-style, beer gardens and finding new restaurants.</p>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const idCard: IdCard = await getDataFile('src/data/idCard/idCard.json');
  const allRoles: Array<Role> = await getDataFiles('src/data/roles/');
  const metadata: Metadata = await getDataFile('src/data/metadata.json');

  const allWorkExperience: Array<WorkExperience> = await getDataFiles('src/data/workExperience/');
  const data: IndexParams = { idCard, allRoles, allWorkExperience };
  return {
    props: {
      data,
      metadata,
    },
  };
}

export default SecondPage;
