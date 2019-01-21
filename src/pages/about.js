import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="About Pedro" />
    <h1>About me...</h1>
    <p>
      I'm a Software Engineer. I love coding for the web and constantly improve
      my knowledge about computer systems
    </p>
    <Link className="navigation-link" to="/">Go back to the homepage</Link>
  </Layout>
);

export default SecondPage
