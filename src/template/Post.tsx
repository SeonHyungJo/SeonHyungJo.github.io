import React from 'react'
import AdSense from 'react-adsense'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import { TagList, Utterences, PageMoveBtnContainer, NameCard } from '@components/index'
import nameCard from '@data/nameCard'

import { styled } from '@stitches.config'
import './prism-tomorrow.scss'
import SEO from '@components/SEO'

const PostC = styled('section', {
  width: '100%',
  background: 'white',

  margin: '12px 0',
  padding: '4px',
  boxShadow: '$shadow',

  borderRadius: '$postBr',

  '@mobile': {
    margin: 0,
  },
})

const PostTitle = styled('h1', {
  fontSize: '$9',
  fontWeight: 'bold',
  textAlign: 'center',

  margin: '12px 0 0',
})

const PostDate = styled('p', {
  fontSize: '$1',
  fontWeight: 'bold',
  textAlign: 'right',
  color: '$gray05',

  margin: '0 12px',

  '@mobile': {
    fontSize: '14px',
  },
})

const PostTagListC = styled('section', {
  padding: '0 12px',
})


const PostContents = styled('article', {
  padding: '0 12px',
})

const PostFooter = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',

  margin: '12px 0',
})


export default function PostTemplate(context): JSX.Element {
  const { data, pageContext } = context
  const { html, frontmatter, excerpt} = data.markdownRemark
  const { title, date, tags } = frontmatter

  return (
    <>
      <SEO title={title} description={excerpt} keywords={tags}/>
      <Helmet>
        <script
          async
          crossOrigin='anonymous'
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8793464953717853'
        />
      </Helmet>

      <PostC>
        <PostTitle>{title}</PostTitle>
        <PostDate>{date}</PostDate>
        <PostContents dangerouslySetInnerHTML={{ __html: html }} />
        <PostTagListC>
          <TagList tags={tags} />
        </PostTagListC>

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
            excerpt(pruneLength: 180)
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                tags
                title
            }
        }
    }
`

