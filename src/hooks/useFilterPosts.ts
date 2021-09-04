const useFilterPosts = ({ posts, filterList, category }) => {
  return (
    posts
      .filter(({ node }) => node.frontmatter.category === category)
      .filter(({ node }) => {
        if (filterList.length == 0) {
          return true
        } else {
          for (const key of filterList) {
            if (node.frontmatter.tags && node.frontmatter.tags.includes(key)) {
              return true
            }
          }
        }
        return false
      })
      .filter(post => {
        return post.node.frontmatter.title.length > 0
      })
  )
}

export default useFilterPosts
