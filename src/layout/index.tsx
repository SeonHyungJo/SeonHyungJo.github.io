import { graphql, navigate } from 'gatsby'
import React, { useState, useEffect } from 'react'
import { TransitionGroup, Transition } from 'react-transition-group'
import Helmet from 'react-helmet'

import { Header, TabContainer, TagSlider, Footer, NameCard } from '@components/index'

import TabList from '@data/TabList'

import '@style/reset.scss'
import { styled } from '@stitches.config'

const CONTENT_LIST = ['content', 'aboutme']
const SLIDER_PAGE_LIST = ['', 'content', 'aboutme', 'article']

const LayoutC = styled('section', {
  maxHeight: '100vh',

  'overflow': '-moz-scrollbars-none',
  'overflow-x': 'auto',
  '-ms-overflow-style': 'none',

  '&::-webkit-scrollbar': {
    width: '0 !important',
  },
})

const PostC = styled('section', {
  margin: '0 auto',
  maxWidth: '680px',

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

  '@mobile': {
    margin: '0 auto',
    maxWidth: '600px',
    padding: '0',
  },
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
  const pathSplit = location.pathname.split('/')
  const checkContent = CONTENT_LIST.includes(pathSplit[1])
  const checkSlider = SLIDER_PAGE_LIST.includes(pathSplit[1])
  const checkPostPath = pathSplit[1] === 'post'

  const [filterList, setFilter] = useState([])

  useEffect(() => {
    pathSplit[1] === '' && navigate(TabList[0].path)
  }, [])

  useEffect(() => {
    checkPostPath && navigate(TabList[0].path)
  }, [filterList])

  useEffect(() => {
    checkSlider && setFilter([])
  }, [checkSlider])

  return (
    <LayoutC>
      <CustomHelmet />
      <Header title={'sNyung.com'}>
        <TabContainer TabList={TabList} />
      </Header>

      {checkContent || <NameCard key={pathSplit[1]} />}
      {checkSlider || <TagSlider setFilter={setFilter} />}

      <TransitionGroup>
        <Transition
          key={location.pathname}
          timeout={{ enter: 300, exit: 500 }}
        >
          {status => (
            <PostC className={status}>
              {React.cloneElement(children, { filterList })}
              {location.pathname !== '/' && <Footer />}
            </PostC>
          )}
        </Transition>
      </TransitionGroup>
    </LayoutC>
  )
}

export const pageQuery = graphql`
    query NavQuery {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { category: { eq: "post" } } }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 100)
                    id
                    frontmatter {
                        title
                        date(formatString: "YYYY/MM/DD")
                        path
                    }
                }
            }
        }
    }
`
