import React, { useEffect, useRef } from 'react'

import { styled } from '@stitches.config'

const src = 'https://utteranc.es/client.js'

const UtterencesC = styled('section', {
  maxWidth: '$contentWidth',
  margin: '0rem auto',
})


export default function Utterences({ repo, theme }: { repo: string, theme: string }): JSX.Element {
  const rootElm = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const utterances = document.createElement('script')
    const utterancesConfig = {
      src,
      repo,
      theme,
      async: true,
      'issue-term': 'pathname',
      crossorigin: 'anonymous',
    }

    Object.keys(utterancesConfig).forEach(configKey => {
      utterances.setAttribute(configKey, utterancesConfig[configKey])
    })

    if (rootElm && rootElm.current) {
      rootElm.current.appendChild(utterances)
    }
  }, [])

  return (<UtterencesC ref={rootElm} />)
}
