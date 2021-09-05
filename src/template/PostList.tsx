import React, { useState } from 'react'

import { Search, PostItem, PageBtnContainer, NameCard } from '@components/index'

import { getAllPosts } from '@query/index'
import { useFilterPosts } from '@hooks/index'

import { styled } from '@stitches.config'
import SEO from '@components/SEO'

const searchIndices = [{ name: `snyung.com`, title: `snyung.com` }]

const PostC = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto',
  gridGap: '20px 25px',

  '@mobile': {
    gridTemplateColumns: '1fr',
    padding: '12px',
  },
})

export default function PostListTemplate(context): JSX.Element {
  const { pageContext, location } = context
  const pathSplit = location.pathname.split('/')
  const { skip, limit } = pageContext

  const [filterList, setFilter] = useState([])

  const posts = getAllPosts()
  const postList = useFilterPosts({ posts, filterList, category: pageContext.category })

  return (
    <>
      <SEO title={'개발 공부 & 공유 일지'} description={'개발하면서 느끼고 알게된 내용을 공유할 수 있는 공간, 나에게는 일기장 누군가에게 사전'}/>
      <NameCard key={pathSplit[1]} />
      <Search indices={searchIndices} />

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

