import React from 'react'
import { Link } from 'react-router-dom'
import './Homemain.css'
import moment from 'moment'


const Questions = ({ question }) => {
  return (
    <div className='display-question-container'>
      <div className='display-votes-ans'>
        <div>
          {question.upVotes.length > 0 ? (
            <p>{question.upVotes.length}<p> votes</p></p> 
          ) : question.downVotes.length > 0 ? (
            <p>{question.downVotes.length} <p> votes</p></p> 
          ) : (
            <p>No votes</p>
          )}
        </div>

        <div><p>{question.noOfAnswers}</p><p>answers</p></div>
      </div>
      <div className='display-question-details'>
        <Link to={`./Questions/${question._id}`} className='question-title-link'>{question.questionTitle}</Link>
        <div className='dispaly-tags-time'>
          <div className='display-tags'>
            {
              question.questionTags.map((tag) => (
                <p key={tag}>{tag}</p>
              ))
            }
          </div>
        </div>
      </div>
      <div className='display-time'>asked on {moment(question.askedOn).fromNow()} by {question.userPosted}</div>
    </div>
  )
}

export default Questions