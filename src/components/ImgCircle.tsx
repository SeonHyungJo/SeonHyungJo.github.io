import React from 'react'
import Image, { FixedObject } from 'gatsby-image'

import { css } from '@stitches.config'

const imgCircleC = css('img', {
  width: '$avatarImg',
  height: '$avatarImg',

  borderRadius: '100%',
  border: '5px solid $cardColor02',

  '@mobile': {
    width: '12px',
    height: '12px',

    margin: 0,
  },
})

const ImgCircle = ({ fixed }: { fixed: FixedObject | FixedObject[] }): JSX.Element => {
  return (
    <Image className={imgCircleC} fixed={fixed} />
  )
}

export default ImgCircle
