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

  margin: '16px 0',

  '@mobile':{
    padding: '0 12px',
  }
})

const PageButton = styled('button', {
  background: '$white',
  boxShadow: '$shadow',

  padding: '6px 16px',

  fontWeight: 'bold',
  borderRadius: '$listBoxBr',
})

export default function PageBtnContainer(
  {
    filterList,
    pageContext: { prev, next, category, skip, limit },
  }): JSX.Element {

  const prevPath = useMemo<string>(() => `/${category}/${prev === 0 ? '' : prev}`, [category, prev])
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
        <div /> :
        <Link to={nextPath}>
          <PageButton>
            {NEXT_BUTTON_TXT}
          </PageButton>
        </Link>
      }
    </PageButtonC>
  )
}
