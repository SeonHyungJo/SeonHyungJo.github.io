import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

export default function IndexPage(): JSX.Element {
  useEffect(() => {
    navigate("/post")
  }, [])

  return (<></>)
}
