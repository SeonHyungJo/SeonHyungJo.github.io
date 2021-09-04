import React from 'react'
import { Link } from 'gatsby'

import { css } from '@stitches.config'

export interface ITabItem {
  name: string,
  path: string
}

const tabItem = css({
  color: '$headerTitleColor',
  padding: '0.2rem',
  marginRight: '0.5rem',

  backgroundImage: 'linear-gradient(to right, $headerTitleColor, $headerTitleColor)',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 100%',
  backgroundSize: '0 0.2em',

  transition: 'background-size 0.3s ease',

  '&:hover': {
    color: '$headerTitleColor',
    backgroundSize: '100% 0.2em',

    fontWeight: 'bold',
  },
})

const active = css({
  color: '$headerTitleColor',
  backgroundSize: '100% 0.2em',

  fontWeight: 'bold',
})

export default function TabItem({ name, path }: ITabItem): JSX.Element {
  return (
    <Link
      to={path}
      className={tabItem()}
      activeClassName={active()}
    >
      {name.toUpperCase()}
    </Link>
  )
}
