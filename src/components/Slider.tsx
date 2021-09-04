import React, { useState, useEffect } from 'react'
import TagSlider from 'gatsby-tag-slider'

import { getTags } from '@query/index'

const ALL_TAG_NAME = 'All'

export default function Slider({ setFilter }): JSX.Element {
  const [tagList, setTagList] = useState({
    [ALL_TAG_NAME]: {
      id: ALL_TAG_NAME,
      name: ALL_TAG_NAME,
      selected: true,
    },
    ...getTags(),
  })

  useEffect(() => {
    setFilter(() =>
      Object.values(tagList).reduce((acc, tagValue) => {
        tagValue.selected && tagValue.id !== ALL_TAG_NAME && acc.push(tagValue.name)
        return acc
      }, []),
    )
  }, [tagList])

  const selectHandle = (id) => {
    setTagList((prevState) => {
      if (id == ALL_TAG_NAME) {
        Object.keys(prevState).map((key) => {
          prevState[key] = {
            ...prevState[key],
            selected: false,
          }
        })
      } else {
        prevState[ALL_TAG_NAME].selected = false
        const list = Object.values(prevState).filter((values) => values.selected == true)

        list.length == 1 && list[0].id === id && (prevState[ALL_TAG_NAME].selected = true)
      }

      return {
        ...prevState,
        [id]: {
          ...prevState[id],
          selected: !prevState[id].selected,
        },
      }
    })
  }

  return (
    <TagSlider tags={tagList} selectHandle={selectHandle} customClassPrefix={'snyung'} />
  )
}
