import React from 'react'
import Helmet from 'react-helmet'
import { graphql, PageProps } from 'gatsby'

import { NameCard, SponsorButton } from '@components/index'

import { styled } from '@stitches.config'

const AboutMeC = styled('section', {
  maxWidth: '$contentWidth',

  margin: '0 auto',
  padding: '12px 32px',

  background: 'white',
  borderRadius: '$postBr',

  '@mobile': {
    padding: '12px',
  },
})

const AboutMeContents = styled('article', {
  fontSize: '$5',
  fontWeight: 400,
  lineHeight: 1.5,

  padding: 0,

  '@mobile': {
    margin: 0,
    boxShadow: 'none',
  },
})

const AboutMeFooter = styled('article', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: '0',

  '@mobile': {
    flexDirection: 'column',
  },
})

export default function AboutMe({ data }: PageProps): JSX.Element {
  const { html } = data.markdownRemark

  return (
    <>
      <Helmet title={'About me - sNyung'} />

      <AboutMeC>
        <AboutMeContents dangerouslySetInnerHTML={{ __html: html }} />
        <AboutMeFooter>
          <NameCard />
          {/*<SponsorButton sponsorId={'snyung'} />*/}
        </AboutMeFooter>
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
