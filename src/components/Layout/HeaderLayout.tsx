import { styled } from '@stitches.config'

const HeaderLayout = styled('header', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  backgroundImage: '$headerBackground3',

  padding: '1rem 2rem',

  fontSize: '$1',
  fontWeight: 500,

  '@mobile': {
    flexDirection: 'column',
    padding: '0.5rem 1rem',
  },
})

export default HeaderLayout
