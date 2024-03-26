import React from 'react'

const TagList = ({tag}) => {
    return (
        <div className="tag" >
          <h5 style={{background:"var(--bg-color-2)"}}>{tag.tagName}</h5>
          <p>{tag.tagDesc}</p>
        </div>
      );
    };

export default TagList