import React from 'react'
import Image, { FixedObject } from 'gatsby-image'

import { css } from '@stitches.config'

const ImgCircleC = css('img', {
  width: '$avatarImg',
  height: '$avatarImg',

  borderRadius: '100%',
  border: '5px solid #fff',

  '@mobile': {
    width: '12px',
    height: '12px',

    margin: 0,
  },
})

const ImgCircle = ({ fixed }: { fixed: FixedObject | FixedObject[] }): JSX.Element => {
  return (
    <Image className={ImgCircleC} fixed={fixed} />
  )
}

export default ImgCircle
