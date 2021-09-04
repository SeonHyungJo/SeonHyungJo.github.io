import React from 'react'
import AdSense from 'react-adsense'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import { TagList, Utterences, PageMoveBtnContainer, NameCard } from '@components/index'
import nameCard  from '@data/nameCard'

import { styled } from '@stitches.config'
// import './prism.scss'
import './prism-tomorrow.scss'

const PostC = styled('section', {
  width: '100%',
  background: 'white',

  marginTop: '40px',

  '@mobile': {

    boxShadow: 'none',
    marginTop: '20px',

    fontSize: '20px',
  },
})

const PostTitle = styled('h1', {
  fontWeight: 'bold',
  fontSize: '30px',
  textAlign: 'left',
  margin: '8px 16px',

  '@mobile': {
    margin: 0,
    fontSize: '20px',
    textAlign: 'center',
  },
})

const PostContents = styled('article', {
  fontSize: '0.9rem',
  fontWeight: 500,

  lineHeight: 1.5,
  letterSpacing: 'normal',
  padding: '0.5rem 16px',
})

const PostDate = styled('p', {
  color: '#aaaaaa',

  fontSize: '12px',
  textAlign: 'right',
  fontWeight: 'bold',

  margin: '0 12px',

  '@mobile': {
    fontSize: '14px',
  },
})

const PostFooter = styled('section', {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',

  margin: '1rem 0',
})


export default function PostTemplate(context): JSX.Element {
  const { data, pageContext } = context
  const { html, frontmatter } = data.markdownRemark
  const { title, date, tags } = frontmatter

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <script async crossOrigin='anonymous'
                src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8793464953717853' />
      </Helmet>

      <PostC>
        <section>
          <PostTitle>{title}</PostTitle>
          <PostDate>{date}</PostDate>
        </section>
        <PostContents dangerouslySetInnerHTML={{ __html: html }} />
        <TagList tags={tags} />

        <AdSense.Google
          client='ca-pub-8793464953717853'
          slot='3513526331'
          style={{ display: 'block' }}
          format='auto'
          responsive='true'
        />

        <PostFooter>
          <NameCard />
          <PageMoveBtnContainer pageContext={pageContext} />
        </PostFooter>
      </PostC>

      <Utterences {...nameCard.utterences} />
    </>
  )
}

export const query = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            id
            excerpt
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                tags
                title
            }
        }
    }
`

