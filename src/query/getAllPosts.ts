import { graphql, useStaticQuery } from 'gatsby'

const getAllPosts = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
      {
          allMarkdownRemark(
              sort: {fields: [frontmatter___date], order: DESC }
          ) {
              edges {
                  node {
                      excerpt(pruneLength: 180)
                      id
                      frontmatter {
                          title
                          date(fromNow: true, locale: "ko")
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

export default getAllPosts
