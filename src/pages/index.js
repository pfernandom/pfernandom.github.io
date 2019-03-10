import React from 'react'
import { graphql } from 'gatsby'
import { Link } from "gatsby";

import Layout from '../components/layout'
import SEO from '../components/seo'

import Home from '../components/home'

export default ({ data }) => {
  console.log(data)
  const identification = data.idCardJson;
  const roles = data.allRolesJson.edges.map(i => i.node);
  const experience = data.allWorkExperienceJson.edges.map(i => i.node).sort(function(a, b){return b.startYear - a.startYear});;
  const result = { identification, roles, experience };
  console.log(result)
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Home { ...result } />
      <Link className="navigation-link" to="/about/">Want to know more about Pedro's interests?</Link>
    </Layout>
  )
};

export const query = graphql`
query {
  idCardJson {
    name
    role
    summary
    highlights
    contact {
      icon
      link
      text
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
        responsabilities {
          summary
          content
          categories
        }
      }
    }
  }
}
`
