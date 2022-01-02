import React from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'

import { Header, Footer } from '@components/index'

import '@style/reset.scss'
import { styled } from '@stitches.config'

const LayoutC = styled('section', {
  minHeight: '100vh',

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

  overflow: 'auto',
  '-ms-overflow-style': 'none',

  '&::-webkit-scrollbar': {
    width: '0 !important',
  },

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

export default function Layout({ location, children }: { location: any, children: Element }): JSX.Element {
  return (
    <LayoutC>
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
