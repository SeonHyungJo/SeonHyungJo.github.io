import { Link } from 'gatsby'
import { default as React } from 'react'
import {
  connectStateResults,
  Highlight,
  Hits,
  Index,
} from 'react-instantsearch-dom'

import { styled } from '@stitches.config'

const SearchResultC = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',

  margin: '12px 0',
  padding: '0 8px',

  borderRadius: '25px',
  backgroundColor: '$gray02',
  overflow: 'auto',
})

const PostItemC = styled('article', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',

  margin: '0 auto',
  background: '$white',

  boxShadow: '$shadow',
  borderRadius: '$listBoxBr',
})

const PostItemTitle = styled('p', {
  width: '100%',

  textAlign: 'left',
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

const HitCount = connectStateResults(({ searchResults }) => {
  return (
    <p style={{ width: '100%', textAlign: 'center', padding: '0 12px', margin: '12px 0', fontWeight: 'bold' }}>
      {searchResults.nbHits === 0 ? '결과없음' : `총 ${searchResults && searchResults.nbHits}건`}
    </p>
  )
})

const PageHit = ({ hit }) => {
  const excerpt = hit.excerpt.substr(0, 180)

  return (
    <Link to={hit.path}>
      <PostItemC>
        <PostItemTitle>
          <Highlight attribute='title' hit={hit} tagName='mark' />
        </PostItemTitle>
        <PostItemSummary>{excerpt}</PostItemSummary>
      </PostItemC>
    </Link>
  )
}

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits hitComponent={PageHit} />
  </Index>
)

export default function SearchResult({ indices }) {
  return (
    <SearchResultC>
      {
        indices.map(indice => (
          <HitsInIndex index={indice} key={indice.name} />
        ))
      }
    </SearchResultC>
  )
}
