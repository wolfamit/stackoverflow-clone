import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { askQuestion } from '../../actions/question.js'
import './Askquestion.css'

const Askquestion = () => {
  const [questionTitle, setTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [questionTags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const User = useSelector((state) => (state.CurrentUserReducer))
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPosted = User ? User.data.result.name : null;
    const userId = User ? User?.data?.result?._id : null;
    const questionData = {
      questionTitle,
      questionBody,
      userPosted,
      questionTags,
      userId
  };
  try {
    await dispatch(askQuestion(questionData, navigate));
  } catch (error) {
    console.error(error);
  }
};
  

  const handleEnter = (e) => {
    if (e.Key === "Enter") {
      setQuestionBody((questionBody) => questionBody + '\n');
    }
  }

  return (
    <>
    <div id='ask-ques-below'>
      <div className='ask-ques'>
        <div className='ask-ques-container'>
          <h1>Ask a Public Question</h1>
          <form
            action="submit"
            
          >
            <div className='ask-form-container'>

              <label htmlFor="ask-ques-title">
                <h4>Title</h4>
                <p>Be specific and imagine you're asking question to another person</p>
                <input
                  type="text"
                  value={questionTitle}
                  onChange={e => setTitle(e.target.value)}
                  id='ask-ques-title'
                  placeholder='Some Title' />
              </label>

              <label htmlFor="ask-ques-body">
                <h4>Body</h4>
                <p>Include all the information someone would need to answer your question</p>
                <textarea id='ask-ques-body'
                  rows='12' col='12'
                  value={questionBody}
                  placeholder='What would you like to ask?'
                  onChange={e => setQuestionBody(e.target.value)}
                  onKeyDown={handleEnter}
                  className='ques-body'
                  type="text" />
              </label>

              <label htmlFor="ask-ques-tags">
                <h4>Tags</h4>
                <p>Add space seperated tags to describe Q's </p>
                <input
                  id='ask-ques-tags'
                  value={questionTags}
                  onChange={e => setTags(e.target.value.split(' '))}
                  className='ques-body'
                  type="text"
                  placeholder='e.g (xml typescript wordpress) ' />
              </label>
              <button
                className='review-btn'
                type="submit"
                onClick={handleSubmit}
                >Submit your question</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Askquestion