import React from 'react'

import { styled } from '@stitches.config'
import { EmailIcon, FacebookIcon, GithubIcon, TwitterIcon } from '@components/Icon'

export const SNSItem = styled('div', {
  width: '15px',

  padding: 0,
  margin: '0 0.2rem',
})

export const SNSList = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContents: 'center',
  alignItems: 'center',

  padding: '0.3rem 0',
})

export const SNS = (): JSX.Element => {
  return (
    <SNSList>
      <SNSItem>
        <EmailIcon />
      </SNSItem>
      <SNSItem>
        <FacebookIcon />
      </SNSItem>
      <SNSItem>
        <GithubIcon />
      </SNSItem>
      <SNSItem>
        <TwitterIcon />
      </SNSItem>
    </SNSList>
  )
}
