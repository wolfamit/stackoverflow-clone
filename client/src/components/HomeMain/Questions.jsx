import React from 'react'
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom'
import moment from 'moment'
import './Homemain.css'


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
      <div className='display-time'>
        asked on {moment(question.askedOn).format('YY/MM/DD , h:mm a')} <br />
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar py='9px' px='9px' />
          <Link style={{ textDecoration: 'none', color: 'var(--text-color-2)', cursor: 'pointer' }} to={`/Users/${question.UserId}`}>
            {question.userPosted}
          </Link>
        </span>
      </div>
    </div>


  )
}

export default Questions