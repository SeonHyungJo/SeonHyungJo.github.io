import React from 'react'

import { styled } from '@stitches.config'

const SponsorButtonC = styled('a', {
  display: 'inline-block',

  textAlign: 'center',
  backgroundColor: '$cardColor02',

  borderRadius: '50px',

  fontSize: '$1',
  lineHeight: '40px',
  color: '$white',

  padding: '0 8px',
})

const Img = styled('img', {
  width: '25px',
  marginBottom: '1px',
  verticalAlign: 'middle',

  boxShadow: 'none',
})

const SponsorTxt = styled('span', {
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
