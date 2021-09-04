import React, { useMemo } from 'react'
import { Link } from 'gatsby'

import { getAllPosts } from '@query/index'

import { styled } from '@stitches.config'
import { useFilterPosts } from '@hooks/index'

const NEXT_BUTTON_TXT = '다음 →'
const PREV_BUTTON_TXT = '← 이전'

const PageButtonC = styled('section', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 16px',
  '@mobile':{
    margin: '1rem 0'
  }
})

const PageButton = styled('button', {
  padding: '4px 16px',
  background: '$white',
  boxShadow: '$shadow',
  transition: 'background-color 0.3s ease, color 0.3s ease',

  fontWeight: 700,
  borderRadius: '50px',

  '&:hover': {
    color: '$white',
    boxShadow: 'none',
    backgroundColor: '$cardColor',
  },
})

export default function PageBtnContainer(
  {
    filterList,
    pageContext: { prev, next, category, skip, limit },
  }): JSX.Element {

  const prevPath = useMemo<string>(() => `/${category}/${prev}`, [category, prev])
  const nextPath = useMemo<string>(() => `/${category}/${next}`, [category, next])

  const postList = useFilterPosts({ posts: getAllPosts(), filterList, category })
  const nextWhether = skip < postList.length && postList.length <= skip + limit

  return (
    <PageButtonC>
      {prev === '' ?
        <div /> :
        <Link to={prevPath}>
          <PageButton>
            {PREV_BUTTON_TXT}
          </PageButton>
        </Link>
      }
      {nextWhether ?
        < div /> :
        <Link to={nextPath}>
          <PageButton>
            {NEXT_BUTTON_TXT}
          </PageButton>
        </Link>
      }
    </PageButtonC>
  )
}
