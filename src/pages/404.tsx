import React from 'react'

export default function NotFound(): JSX.Element {
  if (typeof window !== 'undefined') {
    window.location = '/'
  }

  return null
}

