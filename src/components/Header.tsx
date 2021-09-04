import React from 'react'

import { HeaderLayout } from '@components/Layout'
import { styled } from '@stitches.config'

const HeaderTitle = styled('a', {
  color: '$headerTitleColor',

  fontFamily: 'Fira Sans, sans-serif',
  fontSize: '$9',
  fontWeight: 'bold',

  '@mobile': {
    padding: '0.3rem',
    fontSize: '$7',
  },
})

export default function Header({ title = '', children }: { title: string, children: Element }): JSX.Element {
  return (
    <HeaderLayout>
      <HeaderTitle href={'/post'}>
        {title}
      </HeaderTitle>

      {children}
    </HeaderLayout>
  )
}

