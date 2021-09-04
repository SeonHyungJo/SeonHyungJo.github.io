import { graphql, useStaticQuery } from 'gatsby'

const getTags = () => {
  const { allMarkdownRemark: { edges } } = useStaticQuery(
    graphql`
        query { allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC },
            filter: {frontmatter: {category: {eq: "post" } } }
        ) {
            edges {
                node {
                    frontmatter {
                        tags
                    }
                }
            }
        }
        }
    `,
  )

  return edges.reduce((acc, { node }) => {
    node.frontmatter.tags.forEach(tag => acc[tag] = {
      id: tag,
      name: tag,
      selected: false,
    })
    return acc
  }, {})
}

export default getTags
