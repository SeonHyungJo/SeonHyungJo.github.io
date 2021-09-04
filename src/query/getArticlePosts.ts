import { graphql, useStaticQuery } from 'gatsby'

const getArticlePosts = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
      {
          allMarkdownRemark(
              sort: {fields: [frontmatter___date], order: DESC }
              filter: {frontmatter: {category: {eq: "article"}}}
          ) {
              edges {
                  node {
                      excerpt(pruneLength: 200)
                      id
                      frontmatter {
                          title
                          date(formatString: "YYYY/MM/DD")
                          path
                          tags
                          category
                      }
                  }
              }
          }
      }
  `)

  return allMarkdownRemark.edges
}

export default getArticlePosts
