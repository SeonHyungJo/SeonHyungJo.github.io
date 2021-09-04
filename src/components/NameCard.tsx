import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import nameCard from '@data/nameCard'
import { SNS, ImgCircle } from '@components/index'

import { styled } from '@stitches.config'
import { keyframes } from '@stitches/react'

const { nickName, text } = nameCard

const CardItem = styled('section', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  background: '$cardColor',

  padding: '12px 6px',

  borderRadius: '1rem',
  boxShadow: '$shadow',

  '@mobile': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

    padding: '1rem 0.3rem',
  },
})

const CardContents = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  justifyContents: 'center',
  alignItems: 'center',

  padding: '0 0.5rem',
})

const rotation = keyframes({
  '0%': { transform: 'rotate(-5deg)' },
  '100%': { transform: 'rotate(5deg)' },
})

const NickName = styled('section', {
  color: '$cardColor',
  backgroundColor: '$headerBackground1',
  borderRadius: '8px',

  padding: '0.1rem 0.3rem',

  fontSize: '$1',
  fontWeight: 'bold',
  lineHeight: 1.6,

  animation: `${rotation} 1s infinite alternate-reverse linear`,
})

const Presentation = styled('section', {
  color: '#fff',
  textAlign: 'center',
  padding: '0.75rem',
  margin: 0,

  fontSize: '$2',

  whiteSpace: 'pre-line',
  wordBreak: 'keep-all',
})

export default function NameCard(): JSX.Element {
  return (
    <StaticQuery
      query={graphql`
    query cardQuery {
        avatar: file(absolutePath: { regex: "/assets/cardAvatar.png/" }) {
            childImageSharp {
                fixed(width: 100, height: 100) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`}
      render={data => {
        return (
          <CardItem>
            <Link to={'/aboutme'}>
              <ImgCircle fixed={data.avatar.childImageSharp.fixed} />
            </Link>
            <CardContents>
              <Link to={'/aboutme'}>
                <NickName>{`👋 ${nickName}`}</NickName>
              </Link>
              <Presentation dangerouslySetInnerHTML={{ '__html': text }} />
              <SNS />
            </CardContents>
          </CardItem>
        )
      }}
    />
  )
}
