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
    size: {
      avatarImg: '3rem',
      contentWidth: '680px',
    },
    colors: {
      white: '#ffffff',

      gray06: '#3d3d3d',
      gray05: '#7a7a7a',
      gray04: '#b4b4b4',
      gray03: '#c8c8c8',
      gray02: '#e8e8e8',
      gray01: '#f8f8f8',

      cardColor: '#00498C',

      headerTitleColor: '#fff',
      headerBackground1: '#EECDA3',
      headerBackground2: '-webkit-linear-gradient(to right, #080808, #EECDA3)',
      headerBackground3: 'linear-gradient(to right, #EF629F, #EECDA3)',
      headerBackground4: '#EF629F',
    },
    shadows: {
      shadow: '0 0 4px 3px #7a7a7a',
      shadowHover: '0 0 7px 7px #7a7a7a',
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
    media: {
      desktop: '(min-width: 641px)',
      mobile: 'screen and (max-width: 640px)',
    },
  },
})
