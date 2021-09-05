import React from 'react'

import { styled } from '@stitches.config'

const SkillTag = styled('span', {
  padding: '4px 12px',

  backgroundColor: '$cardColor02',
  borderRadius: '$postBr',
  border: 'none',

  color: '$white',
  fontSize: '$1',
  cursor: 'pointer',
})

export default function Tag({ tagName }: { tagName: string }): JSX.Element {
  return (
    <SkillTag>{`#${tagName}`}</SkillTag>
  )
}
