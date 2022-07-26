import React from 'react';
import { getDataFile } from 'src/helpers/data-fetchers';
import { Metadata } from 'src/models/interfaces';

export default function Custom500() {
  return <h1>500 - Server-side error occurred</h1>;
}

export async function getStaticProps() {
  const metadata: Metadata = await getDataFile('src/data/metadata.json');

  return {
    props: {
      metadata,
    },
  };
}
