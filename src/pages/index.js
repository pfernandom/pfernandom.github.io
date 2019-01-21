import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Home from '../components/home'

export default ({ data }) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Home {...data.dataJson} />
  </Layout>
)

export const query = graphql`
  query {
    dataJson {
      identification {
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
      roles {
        title
        tags
      }
      experience {
        startDate
        endDate
        description
        project
        responsabilities {
          content
          categories
        }
        tags
      }
    }
  }
`
