import React from 'react'
import { Link } from 'gatsby'

import { styled } from '@stitches.config'
import { TagList } from '@components/index'

const PostItemC = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',

  background: '$white',

  boxShadow: '$shadow',
  borderRadius: '$listBoxBr',
})

const PostItemTitle = styled('p', {
  fontSize: '$4',
  fontWeight: 'bold',
  color: '$black',

  margin: 0,
  padding: '14px 16px',

  borderBottom: '2px solid $gray01',
})

const PostItemSummary = styled('p', {
  fontSize: '$2',
  color: '$black',

  margin: 0,
  padding: '12px 16px',
})

const PostItemFooter = styled('section', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',

  padding: '12px 16px',
})

const PostItemDate = styled('span', {
  fontSize: '$2',
  color: '$gray05',
})

export default function PostItem({ post }): JSX.Element {
  const { frontmatter, excerpt } = post
  const { title, path, date, tags } = frontmatter

  return (
    <Link to={path}>
      <PostItemC>
        <section>
          <PostItemTitle>{title}</PostItemTitle>
          <PostItemSummary>{excerpt}</PostItemSummary>
        </section>
        <PostItemFooter>
          <TagList tags={tags} />
          <PostItemDate>{date}</PostItemDate>
        </PostItemFooter>
      </PostItemC>
    </Link>
  )
}
