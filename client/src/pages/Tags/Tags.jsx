import React from 'react'
import { useSelector } from 'react-redux';
import TagList from './TagList';
import { List } from './List'
import "./Tags.css";

const Tags = () => {
  const toggle = useSelector(state=>state.toggleReducer)
  return (
    <>
    <div id={`${toggle.toggle? 'tags100': 'tags-below'}`}>
    

      <div className="tags-container">
        <h1 className="tags-h1">Tags</h1>
        <p className="tags-p">
          A tag is a keyword or label that categorizes your question with other,
          similar questions.
        </p>
        <p className="tags-p">
          Using the right tags makes it easier for others to find and answer
          your question.
        </p>
        <div className="tags-list-container" >
          {List.map((tag, index) => (
            <TagList tag={tag} key={index}  />
          ))}
        </div>
      </div>
    </div>
    </>

  );
};

export default Tags