import React, { useState } from 'react'

import { PostItem, PageBtnContainer, NameCard } from '@components/index'

import { getAllPosts } from '@query/index'
import { useFilterPosts } from '@hooks/index'

import { styled } from '@stitches.config'

const PostC = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto',
  gridGap: '20px 25px',

  '@mobile': {
    gridTemplateColumns: '1fr',
    padding: '12px'
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
    <>
      <NameCard key={pathSplit[1]} />
      {/*<TagSlider setFilter={setFilter} />*/}

      <PostC>
        {
          postList
            .slice(skip, skip + limit)
            .map(({ node }) => <PostItem key={node.id} post={node} />)
        }
      </PostC>

      <PageBtnContainer
        filterList={filterList}
        pageContext={pageContext}
      />
    </>
  )
}

