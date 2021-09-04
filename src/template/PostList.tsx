import React, { useState } from 'react'

import { PostItem, PageBtnContainer, TagSlider, NameCard } from '@components/index'

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
  const pathSplit = location.pathname.split('/')
  const { pageContext } = context
  const { skip, limit } = pageContext

  const [filterList, setFilter] = useState([])

  const posts = getAllPosts()
  const postList = useFilterPosts({ posts, filterList, category: pageContext.category })

  return (
    <BlogPost>
      <NameCard key={pathSplit[1]} />
      <TagSlider setFilter={setFilter} />

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

