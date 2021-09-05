import { styled } from '@stitches.config'

const HeaderLayout = styled('header', {
  position: 'sticky',
  top: 0,

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',
  height: '$headerHeight',

  backgroundImage: '$headerBackground3',

  padding: '0 32px',

  fontSize: '$1',
  fontWeight: 500,
  boxShadow: '$navShadow',

  zIndex: 100000,

  '@mobile': {
    padding: '20px',
  },
})

export default HeaderLayout
