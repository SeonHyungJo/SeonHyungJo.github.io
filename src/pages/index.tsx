import React, { useEffect } from 'react'
import { navigate } from 'gatsby-link'

export default function IndexPage(): JSX.Element {
  useEffect(() => {
    navigate('/post').then()
  }, [])
  return (<></>)
}
