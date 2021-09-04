import React from 'react'

import { styled } from '@stitches.config'

const SponsorButtonC = styled('a', {
  display: 'inline-block',

  width: '133px',
  height: '40px',

  textAlign: 'center',
  backgroundColor: '#800080',

  borderRadius: '20px',

  fontSize: '12px',
  lineHeight: '40px',
  color: '#ffffff',

  margin: '0.3rem',

  transition: 'background-color 0.3s ease',

  '&:hover, &:active': {
    backgroundColor: '#77af9c',
    color: '#ffffff',
  },

  '@mobile': {
    margin: '0.3rem',
  },
})

const Img = styled('img', {
  width: '25px',
  marginBottom: '1px',
  verticalAlign: 'middle',
})

const SponsorTxt = styled('img', {
  marginLeft: '5px',
})

const LOGO_PATH = 'https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg'

export default function SponsorButton({ sponsorId }: { sponsorId: string }): JSX.Element {
  return (
    <SponsorButtonC href={`https://www.buymeacoffee.com/${sponsorId}`} target='_blank' rel='noreferrer'>
      <Img src={LOGO_PATH} alt={'Buy Me A Coffee'} />
      <SponsorTxt>{'Buy me a coffee'}</SponsorTxt>
    </SponsorButtonC>
  )
}
