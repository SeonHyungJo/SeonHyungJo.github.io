import React from 'react'

import { styled } from '@stitches.config'

const SkillTag = styled('span', {
  margin: '8px',
  padding: '4px 12px',
  border: '1.2px solid #555',
  borderRadius: '10px',
  fontSize: '12px',
  cursor: 'pointer',

  '&:hover': {
    color: 'white',
    fontWeight: 700,
    backgroundColor: '#77af9c',
    border: 'none',
  },
})

export default function Tag({ tagName }: { tagName: string }): JSX.Element {
  return (
    <SkillTag>{`# ${tagName}`}</SkillTag>
  )
}
