import React, { memo } from 'react'

import TabList from '@data/tabList'

import { Layout, TabContainer } from '@components/index'
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

export default memo(function Header(): JSX.Element {
  return (
    <Layout.HeaderLayout>
      <HeaderTitle href={'/post'}>{'SNYUNG.COM'}</HeaderTitle>
      <TabContainer tabList={TabList} />
    </Layout.HeaderLayout>
  )
})

