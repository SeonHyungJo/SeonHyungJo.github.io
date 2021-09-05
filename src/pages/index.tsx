import React, { useEffect } from 'react'

export default function IndexPage(): JSX.Element {
  useEffect(() => {
    window.location.replace('/post')
  }, [])

  return (<></>)
}
