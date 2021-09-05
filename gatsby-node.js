const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

const BlogTemplate = path.resolve(`src/template/Post.tsx`)
const PagesComponent = path.resolve(`src/template/PostList.tsx`)

const limit = 20

const getPostsQuery = (graphql, categoryName) => graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { frontmatter: { category: { eq: "${categoryName}" } } }
      ) {
        edges {
          node {
            html
            id
            timeToRead
            frontmatter {
              date(formatString: "YYYY/MM/DD")
              path
              tags
              title
              category
            }
          }
        }
      }
    }
  `)

const createPostPages = async (createPage, graphql, categoryName) => {
  const result = await getPostsQuery(graphql, categoryName)

  if (result.errors) {
    throw new Error(result.errors)
  }

  const posts = result.data.allMarkdownRemark.edges
  const maxPageNum = Math.ceil(posts.length / limit)

  Array.from({ length: maxPageNum }).forEach((_, i) => {
    const pagePath = i === 0 ? '' : i
    const path = `/${categoryName}/${pagePath}`
    const next = i === maxPageNum - 1 ? '' : i + 1
    const prev = i === 0 ? '' : i === 1 ? 0 : i - 1

    createPage({
      path: path,
      component: PagesComponent,
      context: {
        limit,
        skip: i * limit,
        prev,
        next,
        maxPageNum,
        category: categoryName,
      },
    })
  })

  for (let i = 0; i < posts.length; i++) {
    const { node } = posts[i]
    const path = node.frontmatter.path
    const prev = i === 0 ? null : posts[i - 1].node
    const next = i === posts.length - 1 ? null : posts[i + 1].node

    createPage({
      path,
      component: BlogTemplate,
      context: {
        limit,
        prev,
        next,
        category: categoryName,
      },
    })
  }
}

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  createPostPages(createPage, graphql, 'post').then()
  createPostPages(createPage, graphql, 'article').then()
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@query': path.resolve(__dirname, 'src/query'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@style': path.resolve(__dirname, 'src/style'),
        '@template': path.resolve(__dirname, 'src/template'),
        '@data': path.resolve(__dirname, 'meta-data'),
        '@stitches.config': path.resolve(__dirname, 'stitches.config.ts'),
      },
    },
  })
}
