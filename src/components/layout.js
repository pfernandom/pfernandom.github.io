import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { FaLevelUpAlt } from 'react-icons/fa';

import './layout.scss';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
          <footer>
            <div>Pedro Fernando Marquez Soto - Full-stack developer</div>©{' '}
            {new Date().getFullYear()}
            <span className="no-print">
              , Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>.
            </span>
            <a href="#top" className="no-print">
              <FaLevelUpAlt />
              Go to top
            </a>
          </footer>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
