import React from 'react'
import PropTypes from 'prop-types'

import Tag from 'component/tag-item'

import './index.scss'

const TagList = ({ tags = [] }) =>
  <div className="tag-list">
    {tags.map((tagName, index) =>
      <Tag key={`${tagName}_${index}`} tagName={tagName} />
    )}
  </div>

TagList.propTypes = {
  tags: PropTypes.array,
}

export default TagList;
