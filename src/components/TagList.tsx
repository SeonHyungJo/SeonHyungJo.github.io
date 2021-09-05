import React from 'react'

import { Tag } from '@components/index'

import { styled } from '@stitches.config'

const TagListC = styled('section', {
  '> *': {
    marginRight: '5px'
  },
})

export default function TagList({ tags = [] }: { tags: readonly string[] }): JSX.Element {
  return (
    <TagListC>
      {tags.map((tagName, index) =>
        <Tag key={`${tagName}_${index}`} tagName={tagName} />,
      )}
    </TagListC>
  )
}

