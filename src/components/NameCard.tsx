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
  justifyContent: 'flex-start',
  alignItems: 'center',

  maxWidth: '480px',

  background: '$cardColor01',

  margin: '12px auto',
  padding: '16px 32px',

  border: '3px solid $cardColor02',
  borderRadius: '20px',
  boxShadow: '$shadow',

  '@mobile':{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    width: 'calc(100% - 24px)'
  }
})

const CardContents = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  justifyContents: 'center',
  alignItems: 'flex-start',

  padding: '0 32px',

  '@mobile':{
    justifyContent: 'center',
    alignItems: 'center',

    padding: '0',
  }
})

const rotation = keyframes({
  '0%': { transform: 'rotate(-5deg)' },
  '100%': { transform: 'rotate(5deg)' },
})

const NickName = styled('button', {
  color: '$cardColor02',
  backgroundColor: '$headerBackground1',
  borderRadius: '8px',

  padding: '0.1rem 0.3rem',

  fontSize: '$1',
  fontWeight: 'bold',
  lineHeight: 1.6,

  animation: `${rotation} 1s infinite alternate-reverse linear`,
})

const Presentation = styled('p', {
  margin: '12px 0',
  padding: 0,

  fontSize: '$2',
  fontWeight: 'bold',
  color: '$cardColor02',
  textAlign: 'left',

  whiteSpace: 'pre-line',
  wordBreak: 'keep-all',
})

export default function NameCard(): JSX.Element {
  return (
    <StaticQuery
      query={graphql`query cardQuery {
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
              <Link to={nickName.to}>
                <NickName>{`👋 ${nickName.name}`}</NickName>
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
