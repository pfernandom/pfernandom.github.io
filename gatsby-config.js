/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
module.exports = {
  siteMetadata: {
    title: `Pedro Fernando Marquez Soto - Full-stack developer`,
    description: `I am a full-stack developer with experience with JavaScript, Java and multiple frameworks. I currently work at LinkedIn and I'm starting on the realms of WebAssembly and Rust.`,
    author: `@pfernandom`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        ignore: [`**/\.*`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Pedro Marquez Resume`,
        short_name: `Pedro's Resume`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/pumpkin-small.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sass`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-101513682-1',
      },
    },
  ],
};
