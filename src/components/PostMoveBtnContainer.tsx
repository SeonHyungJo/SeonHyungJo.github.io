import React from 'react'
import { Link } from 'gatsby'

import { styled } from '@stitches.config'

const PostMoveBtnC = styled('section', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',

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
  padding: '4px 16px',

  outline: 'none',
  borderRadius: '$listBoxBr',
  backgroundColor: '$white',

  color: '$black',

  '@mobile': {
    '&:last-child': {
      textAlign: 'right',
    },
  },
})

const PageBtn = ({ to, text }: { to: stringw, text: string }): JSX.Element =>
  <Link to={to} className={'page-btn'}>
    <PostMoveBtn>
      {text}
    </PostMoveBtn>
  </Link>

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
