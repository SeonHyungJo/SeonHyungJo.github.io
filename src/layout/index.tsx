import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import Helmet from 'react-helmet'

import { Header, Footer } from '@components/index'

import '@style/reset.scss'
import { styled } from '@stitches.config'

const LayoutC = styled('section', {
  minHeight: '100vh',
  maxHeight: '100vh',

  backgroundColor: '$gray01',

  overflow: 'auto',
  '-ms-overflow-style': 'none',

  '&::-webkit-scrollbar': {
    width: '0 !important',
  },
})

const PostC = styled('section', {
  maxWidth: '$contentWidth',

  margin: '0 auto',
  padding: '12px 16px',

  transition: 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)',

  '&.entering': {
    position: 'absolute',
    marginTop: '100px',
    opacity: 0,
  },

  '&.entered': {
    opacity: 1,
  },

  '&.exiting': {
    marginTop: '100px',
    opacity: 0,
  },

  '&.exited': {
    opacity: 0,
  },

  '@mobile':{
    padding: '0',
  }
})

const CustomHelmet = ({ title = 'Home | sNyung\'B ' }) => (
  <Helmet
    title={title}
    meta={[
      { name: 'description', content: `sNyung's 슬기로운 기술 블로그` },
      { name: 'keywords', content: 'snyung, blog, fe, front, js' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
    ]}
  >
    <html lang='ko' />
  </Helmet>
)

export default function Layout({ location, children }: { location: any, children: Element }): JSX.Element {
  return (
    <LayoutC>
      <CustomHelmet />

      <Header/>

      <TransitionGroup>
        <Transition
          key={location.pathname}
          timeout={{ enter: 300, exit: 500 }}
        >
          {status => (
            <PostC className={status}>
              {React.cloneElement(children)}
              <Footer/>
            </PostC>
          )}
        </Transition>
      </TransitionGroup>
    </LayoutC>
  )
}
