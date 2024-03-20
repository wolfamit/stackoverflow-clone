import React from 'react'
import Questions from './Questions'
import "./Homemain.css"

const QuestionsList = ({questionsList}) => {
  return(
    <>  
      {questionsList && questionsList.map((question) => (
        <Questions question={question} key={question._id} />
      ))}
    
    </>
  )
}

export default QuestionsList