import { IndexParams } from 'pages';
import React from 'react';
import { getDataFile, getDataFiles } from 'src/helpers/data-fetchers';
import { IdCard, Role, Metadata, WorkExperience } from 'src/models/interfaces';

import Layout from '../components/layout';

function NotFoundPage({ metadata }: { metadata: Metadata }) {
  return (
    <Layout data={metadata}>
      <>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </>
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

export default NotFoundPage;
