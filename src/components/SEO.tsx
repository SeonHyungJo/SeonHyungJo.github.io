import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

type MetaProps = JSX.IntrinsicElements['meta']

interface SEOProps {
  description: string
  lang?: string
  meta?: MetaProps[]
  title: string,
  keywords?: string[]
}

const initKeywords = ['snyung', 'blog', 'fe', 'frontend', 'javascript', 'react']

export default function SEO ({ description, lang = 'ko', meta = [], title, keywords = [] }: SEOProps) {
  const { site } = useStaticQuery(
    graphql`
        query SiteMeta {
            site {
                siteMetadata {
                    title
                    description
                    author
                }
            }
        }
    `
  )

  const siteMetadata = site!.siteMetadata!
  const metaDescription = description || siteMetadata.description!

  const constantMeta: MetaProps[] = [
    {
      name: 'keywords',
      content: initKeywords.concat(keywords.join(', '))
    },
    {
      name: 'description',
      content: metaDescription
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:description',
      content: metaDescription
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary'
    },
    {
      name: 'twitter:creator',
      content: siteMetadata.author!
    },
    {
      name: 'twitter:title',
      content: title
    },
    {
      name: 'twitter:description',
      content: metaDescription
    }
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={constantMeta.concat(meta)}
    />
  )
}
