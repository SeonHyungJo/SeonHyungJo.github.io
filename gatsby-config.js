const { name } = require('./package.json')
const path = require('path')

// env setting for netlify preview
const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = 'https://snyung.com/',
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env

const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

module.exports = {
  pathPrefix: process.env.CI ? `/${name}` : '/',
  siteMetadata: {
    author: 'sNyung',
    title: `sNyung's Dev-Log`,
    description: `프론트엔드 개발자 sNyung의 개발 일기`,
    siteUrl,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/layout/index.tsx'),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        title: 'sNyung stater',
        name: 'Gasby sNyung stater',
        short_name: 'sNyung',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'contents/assets/cardAvatar.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/contents`,
        name: 'post',
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: '/sitemap.xml',
        excludes: [],
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        component: path.join(__dirname, 'src/components'),
        layout: path.join(__dirname, 'src/layout'),
        style: path.join(__dirname, 'src/style'),
        util: path.join(__dirname, 'src/util'),
        post: path.join(__dirname, 'post'),
        assets: path.join(__dirname, 'assets'),
        data: path.join(__dirname, 'meta-data'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-emoji',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://snyung.com/',
        sitemap: 'https://snyung.com/sitemap.xml',
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            host: 'https://snyung.com/',
            sitemap: 'https://snyung.com/sitemap.xml',
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                        path
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'sNyung Site\'s RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        // datalayer to be set before GTM is loaded
        // should be a stringified object or object
        // Defaults to null
        defaultDataLayer: function() {
          return {
            pageType: window.pageType,
          }
        },
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
  ],
}
