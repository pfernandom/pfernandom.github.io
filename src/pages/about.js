import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const SecondPage = () => (
  <Layout>
    <SEO title="About Pedro" />
    <h1>About me...</h1>
    <p>
      I am a full-stack developer with experience with JavaScript, Java and
      multiple frameworks. I currently work at LinkedIn and I'm starting on the
      realms of WebAssembly and Rust.
    </p>
    <h2>Prefered Tech Stack</h2>
    <p>
      While most of my experience is working on JavaScript and Java, I've developed
      and interest in coding languages like Rust and Go. I'm looking forward to work
      with WebAssembly and I'm trying to get involved in Open Source as much as possible.
    </p>
    <p>
      I enjoy systems design. I'm very intersted in distributed systems and while I'm
      not very good with databases, data management is of great interest to me.
    </p>
    <h2>Personal Interests</h2>
    <p>
      I love spending time with my family, reading about software development,
      movies, tv shows and video games.
    </p>
    <p>
      I like cookin BBQ Texas-style, beer gardens and finding new restaurants.
    </p>
    <Link className="navigation-link" to="/">
      Go back to the homepage
    </Link>
  </Layout>
);

export default SecondPage
