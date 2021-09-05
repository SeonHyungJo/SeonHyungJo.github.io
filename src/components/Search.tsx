import React, { useState, useMemo } from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import { SearchBox, SearchResult } from '@components/index'
import { styled } from '@stitches.config'

const SearchOverLay = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,

  width: '100%',
  height: '100vh',

  backgroundColor: '$gray01',
})

const ResultC = styled('section', {
  position: 'sticky',
  top: '60px',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',

  width: 'calc(100% - 24px)',
  maxWidth: '480px',
  maxHeight: '80vh',

  margin: '0 auto 12px',

  overflow: 'auto',

  'ul': {
    margin: 0,
  },

  'li': {
    listStyleType: 'none',
  },

  variants: {
    searching: {
      true: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
  },
})

export default function Search({ indices }) {
  const [query, setQuery] = useState('')
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      ),
    [],
  )

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      {query && query.length > 0 &&
      <SearchOverLay onClick={() => setQuery('')} />
      }
      <ResultC searching={query && query.length > 0}>
        <SearchBox />
        {
          query && query.length > 0 &&
          <SearchResult indices={indices} />
        }
      </ResultC>
    </InstantSearch>
  )
}
