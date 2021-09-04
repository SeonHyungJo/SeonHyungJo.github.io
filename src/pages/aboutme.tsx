import React from 'react'
import Helmet from 'react-helmet'
import { graphql, PageProps } from 'gatsby'

import { NameCard, SponsorButton } from '@components/index'

import { styled } from '@stitches.config'

const AboutMeC = styled('section', {
  maxWidth: '720px',
  background: 'white',
  margin: '0 auto',
})

const AboutMeContents = styled('article', {
  fontSize: '20px',
  fontWeight: 400,
  lineHeight: 1.5,
  padding: '0 1rem',

  '@mobile': {
    margin: 0,
    boxShadow: 'none',
  },
})

const AboutMeFooter = styled('article', {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',

  padding: '2rem 0',

  '@mobile': {
    flexDirection: 'column',
    padding: '0.5rem',
  },
})

export default function AboutMe({ data }: PageProps): JSX.Element {
  const { html } = data.markdownRemark

  return (
    <>
      <Helmet title={'About me - sNyung'} />

      <AboutMeC>
        <AboutMeContents dangerouslySetInnerHTML={{ __html: html }} />
        <section>
          <AboutMeFooter>
            <NameCard />
            <SponsorButton sponsorId={'snyung'} />
          </AboutMeFooter>
        </section>
      </AboutMeC>
    </>
  )
}

export const pageQuery = graphql`
    query AboutmeQuery {
        markdownRemark(frontmatter: { path: { eq: "/aboutme" } }) {
            html
        }
    }
`
