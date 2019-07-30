import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

import Home from '../components/home';

export default ({ data }) => {
  const identification = data.idCardJson;
  const roles = data.allRolesJson.edges.map(i => i.node);
  const experience = data.allWorkExperienceJson.edges
    .map(i => i.node)
    .map(i => {
      i.startDate = i.startDate && new Date(i.startDate);
      i.endDate = i.endDate && new Date(i.endDate);
      i.print = true;
      return i;
    })
    .sort(function(a, b) {
      if (!a.startDate) {
        return -1;
      } else if (!b.startDate) {
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
        Want to know more about Pedro's interests?
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
