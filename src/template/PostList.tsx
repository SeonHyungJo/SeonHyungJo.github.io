import React from 'react'

import { PostItem, PageBtnContainer } from '@components/index'

import { getAllPosts } from '@query/index'
import { useFilterPosts } from '@hooks/index'

import { styled } from '@stitches.config'

const BlogPost = styled('section', {
  margin: '0.7rem auto',
  maxWidth: '720px',

  '@mobile': {
    margin: '0.5rem auto',
  },
})

export default function PostListTemplate(context): JSX.Element {
  const { data, pageContext, filterList } = context
  const posts = getAllPosts()
  const { skip, limit } = pageContext
  const postList = useFilterPosts({ posts, filterList, category: pageContext.category })

  return (
    <BlogPost>
      {
        postList
          .slice(skip, skip + limit)
          .map(({ node }) => <PostItem key={node.id} post={node} />)
      }
      <PageBtnContainer
        filterList={filterList}
        pageContext={pageContext}
      />
    </BlogPost>
  )
}

