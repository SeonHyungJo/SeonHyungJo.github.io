import { styled } from '@stitches.config'

const HeaderLayout = styled('header', {
  position: 'sticky',
  top: 0,

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',

  backgroundImage: '$headerBackground3',

  padding: '1rem 2rem',

  fontSize: '$1',
  fontWeight: 500,
  boxShadow: '$navShadow',

  zIndex: 100000,

  '@mobile': {
    flexDirection: 'column',
    padding: '0.5rem 1rem',
  },
})

export default HeaderLayout
