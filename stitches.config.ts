import { createStitches, globalCss } from '@stitches/react'

export const globalStyles = globalCss({
  'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, prea, abbr, acronym, address, big, cite, code,del, dfn, em, img, ins, kbd, q, s, samp,small, strike, strong, sub, sup, tt, var,b, u, i, center,dl, dt, dd, ol, ul, li,fieldset, form, label, legend,table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, embed,figure, figcaption, footer, header, hgroup,menu, nav, output, ruby, section, summary,time, mark, audio, video': {
    margin: 0,
    padding: 0,
    border: 0,
    fontSize: '100%',
    font: 'inherit',
    verticalAlign: 'baseline',
  },

  'article, aside, details, figcaption, figure,footer, header, hgroup, menu, nav, section': {
    display: 'block',
  },
  'body': {
    lineHeight: 1,
    maxHeight: '100vh'
  },

  'ol, ul': {
    listStyle: 'none',
  },

  'blockquote, q': {
    quotes: 'none',
  },

  'blockquote:before, blockquote:after, q:before, q:after': {
    content: '',
    // @ts-ignore
    content: 'none',
  },

  'table': {
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },
})

export const { styled, css, getCssText } = createStitches({
  theme: {
    fonts: {
      system: 'Apple SD Gothic Neo, Spoqa Han Sans, Noto Sans Korean, Apple Gothic, NanumBarunGothic, NanumGothic, Malgun Gothic, sans-serif',
    },
    sizes: {
      avatarImg: '3rem',
      contentWidth: '760px',
      headerHeight: '48px',
    },
    colors: {
      white: '#ffffff',
      black: '#222222',

      gray06: '#3d3d3d',
      gray05: '#7a7a7a',
      gray04: '#b4b4b4',
      gray03: '#c8c8c8',
      gray02: '#e8e8e8',
      gray01: '#f8f8f8',

      cardColor01: '#fff',
      cardColor02: '#D88F66',

      headerTitleColor: '#fff',
      headerBackground1: '#E7DB5D',
      headerBackground2: '-webkit-linear-gradient(336deg, #E7DB5D, #D88F66, #EA7A32)',
      headerBackground3: 'linear-gradient(336deg, #E7DB5D, #D88F66, #EA7A32)',
      headerBackground4: '#EF629F',
    },
    radii: {
      listBoxBr: '12px',
      postBr: '22px',
    },
    shadows: {
      navShadow: 'rgb(63 70 125 / 20%) 0px 1px 3px 0px, rgb(101 94 115 / 10%) 2px 4px 8px 1px',
      shadow: 'rgb(20 20 20 / 2%) 2px 8px 12px 0px, rgb(20 20 20 / 2%) 0px 1px 3px 0px;',
    },
    fontSizes: {
      1: '12px',
      2: '14px',
      3: '16px',
      4: '18px',
      5: '20px',
      6: '22px',
      7: '24px',
      8: '26px',
      9: '28px',
    },
  },
  media: {
    desktop: '(min-width: 601px)',
    mobile: 'screen and (max-width: 600px)',
  }
})
