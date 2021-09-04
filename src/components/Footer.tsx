import React from 'react'

import { FooterLayout } from '@components/Layout'

export default function Footer(): JSX.Element {
  return (
    <FooterLayout>
      {'©'}<a href='https://github.com/SeonHyungJo'>{'sNyung'}</a>, {'Built with'}{' '}
      <a href='https://github.com/SeonHyungJo/gatsby-snyung-starter'>
        {'gatsby-snyung-starter'}
      </a>
    </FooterLayout>
  )
}
