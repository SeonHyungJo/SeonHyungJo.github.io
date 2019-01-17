const { name } = require('./package.json');

module.exports = {
  pathPrefix: process.env.CI ? `/${name}` : `/`,
  siteMetadata: {
    author: 'SeonHyungJo',
    title: `Renewal Blog`,
    siteUrl: `https://seonhyung.netlify.com`,
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        title: 'seonhyung Dev Log',
        name: 'seonhyung Memory Container',
        short_name: 'SeonLog',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'assets/logo.png',
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/some-other-sitemap.xml`,
        exclude: [`/posts/*`, `/acticle/*`, `/aboutme`, `/tags/*`],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
    
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
        }`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/post`,
        name: 'post',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally (default: true)
              active : true,
              // Add a custom css class
              class  : 'emoji-icon',
              // Select the size (available size: 16, 24, 32, 64)
              size   : 64,
              // Add custom styles
              styles : {
                display      : 'inline',
                margin       : '0',
                'margin-top' : '1px',
                position     : 'relative',
                top          : '5px',
                width        : '25px'
              }
            }
          }
        ]
      }
    },
    'gatsby-plugin-react-helmet',
    // 이미지를 불러오기 위한 Plugin
    'gatsby-plugin-sharp',
    // 2019-01-01 Sass 기능 추가
    `gatsby-plugin-sass`
  ],
}
