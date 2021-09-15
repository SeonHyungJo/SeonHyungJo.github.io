import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import { styled } from '@stitches.config'

const SearchForm = styled('form', {
  position: 'sticky',
  top: '54px',
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  margin: 0,
})

const SearchInput = styled('input', {
  width: '100%',
  maxWidth: '480px',

  border: '2px solid $cardColor02',
  borderRadius: '25px',

  padding: '8px 16px',

  fontSize: '$2',
  lineHeight: 1.5,

  '&:focus': {
    outline: 'none',
  },
})

export default connectSearchBox(({ refine, currentRefinement }): JSX.Element => {
  return (
    <SearchForm>
      <SearchInput
        type={'text'}
        placeholder={'검색'}
        aria-label={'Search'}
        onChange={e => refine(e.target.value)}
        value={currentRefinement}
      />
    </SearchForm>
  )
})
