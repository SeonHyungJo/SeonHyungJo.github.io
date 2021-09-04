import React from 'react'
import { Link } from 'gatsby'

import { styled } from '@stitches.config'

const PostItemC = styled('section', {
  background: 'white',
  padding: '0.3rem 0.8rem',
  transition: 'transform 0.5s ease',

  '&:hover': {
    transform: 'scale(1.01, 1.01)',
  },
})

const PostItemTitle = styled('section', {
  fontSize: '14px',
  color: '#7d7d7d',
  margin: '0.3rem 0',
})

const PostItemSummary = styled('section', {
  fontSize: '14px',
  color: '#7d7d7d',
  margin: '0.3rem 0',
})

export default function PostItem({ post }): JSX.Element {
  return (
    <Link to={post.frontmatter.path}>
      <PostItemC>
        <div className='blog-container'>
          <PostItemTitle>
            {post.frontmatter.title}
          </PostItemTitle>
        </div>
        <PostItemSummary>{post.excerpt}</PostItemSummary>
      </PostItemC>
    </Link>
  )
}
