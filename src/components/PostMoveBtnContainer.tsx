import React from 'react'
import { Link } from 'gatsby'

import { styled } from '@stitches.config'

const PostMoveBtnC = styled('section', {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '12px',
  fontWeight: 500,
  margin: '32px 0',

  '@mobile': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    margin: '16px',
  },
})

const PostMoveBtn = styled('button', {
  padding: '4px 12px',

  outline: 'none',
  borderRadius: '50px',
  backgroundColor: '#fff',

  color: '$cardColor',
  letterSpacing: '2px',

  transition: 'background-color 0.3s ease, color 0.3s ease',

  '&:hover': {
    backgroundColor: '$cardColor',
    color: '#fff',
  },

  '@mobile': {
    '&:last-child': {
      textAlign: 'right',
    },
  },
})

const PageBtn = ({ to, text }: { to: stringw, text: string }): JSX.Element =>
  <PostMoveBtn>
    <Link to={to} className={'page-btn'}>
      {text}
    </Link>
  </PostMoveBtn>

export default function PostMoveBtnContainer({ pageContext: { prev = '', next = '' } }): JSX.Element {
  return (
    <PostMoveBtnC>
      {!prev ?
        <div /> :
        <PageBtn to={`${prev.frontmatter.path}`} text={`← ${prev.frontmatter.title}`} />
      }
      {!next ?
        <div /> :
        <PageBtn to={`${next.frontmatter.path}`} text={`${next.frontmatter.title} →`}
        />}
    </PostMoveBtnC>
  )
}
