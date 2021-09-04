import React from 'react'

import { TabItem, ITabItem } from '@components/index'

export default function TabContainer({ tabList = [] }: { tabList: ITabItem[] }): JSX.Element {
  return (
    <nav>
      {tabList.map(item => <TabItem key={item.path} {...item} />)}
    </nav>
  )
}
