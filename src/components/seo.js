import React from 'react';
import PropTypes from 'prop-types';
import { DefaultSeo } from 'next-seo';

function SEO({ description, lang, meta, keywords, title }) {
  return (
    <DefaultSeo
      titale="CV - Pedro Marquez"
      twitter={{
        handle: '@pfernandom',
        site: '@site',
        cardType: 'summary_large_image',
      }}
    />

    // <StaticQuery
    //   query={detailsQuery}
    //   render={({ site: { siteMetadata } }) => {
    //     const metaDescription = description || siteMetadata.description;
    //     return (
    //       <Helmet
    //         htmlAttributes={{
    //           lang,
    //         }}
    //         title={title}
    //         titleTemplate={`%s | ${siteMetadata.title}`}
    //         meta={[
    //           {
    //             name: `description`,
    //             content: metaDescription,
    //           },
    //           {
    //             property: `og:title`,
    //             content: title,
    //           },
    //           {
    //             property: `og:description`,
    //             content: metaDescription,
    //           },
    //           {
    //             property: `og:type`,
    //             content: `website`,
    //           },
    //           {
    //             name: `twitter:card`,
    //             content: `summary`,
    //           },
    //           {
    //             name: `twitter:creator`,
    //             content: siteMetadata.author,
    //           },
    //           {
    //             name: `twitter:title`,
    //             content: title,
    //           },
    //           {
    //             name: `twitter:description`,
    //             content: metaDescription,
    //           },
    //         ]
    //           .concat(
    //             keywords.length > 0
    //               ? {
    //                   name: `keywords`,
    //                   content: keywords.join(`, `),
    //                 }
    //               : [],
    //           )
    //           .concat(meta)}
    //       />
    //     );
    //   }}
    // />
  );
}

SEO.defaultProps = {
  lang: `en`,
  description: '',
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;
