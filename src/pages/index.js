import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Home from '../components/home';

export default ({ data }) => {
  const identification = data.idCardJson;
  const roles = data.allRolesJson.edges.map(i => i.node);
  const experience = data.allWorkExperienceJson.edges
    .map(i => i.node)
    .map(i => {
      const startDate = i.startDate && new Date(i.startDate);
      const endDate = i.endDate && new Date(i.endDate);
      const print = true;
      return Object.assign({}, i, { startDate, endDate, print });
    })
    .sort(function(a, b) {
      if (!a.startDate) {
        return -1;
      }
      if (!b.startDate) {
        return 1;
      }
      return b.startDate - a.startDate;
    });
  const result = { identification, roles, experience };
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} lang="en_US" />
      <Home {...result} />
      <Link className="navigation-link no-print" to="/about/">
        Want to know more about Pedro&apos;s interests?
      </Link>
    </Layout>
  );
};

export const query = graphql`
  query {
    idCardJson {
      name
      role
      graduationDate
      summary
      highlights
      contact {
        icon
        link
        text
        print
      }
    }
    allRolesJson {
      edges {
        node {
          id
          title
          tags
        }
      }
    }
    allWorkExperienceJson {
      edges {
        node {
          id
          project
          startDate
          endDate
          startYear
          role
          description
          tags
          responsibilities {
            summary
            content
            categories
          }
        }
      }
    }
  }
`;
