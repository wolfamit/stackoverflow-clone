import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

import { askQuestion } from '../../actions/question.js'
import Leftsidebar from '../../components/LeftsideBar/Leftsidebar.jsx';
import './Askquestion.css'

const Askquestion = () => {
  const [questionTitle, setTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [questionTags, setTags] = useState([]);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const User = useSelector((state) => (state.CurrentUserReducer))
  // const toggle = useSelector(state=> state.toggleReducer)
  const toastHandle = (message ,error) => {
    error? toast.error(message): toast.success(message);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userPosted = User ? User.data.result.name : null;
    const userId = User ? User.data.result._id : null;
    const questionData = {
      questionTitle,
      questionBody,
      userPosted,
      questionTags,
      userId
  };
  try {
 
    await dispatch(askQuestion(questionData, navigate));

    toastHandle('Successfully submitted');
    // setTitle('');
    // setQuestionBody('');
    // setTags([]);
  } catch (error) {
    console.log(error);
    // Show an error toast if there's an error during submission
    toastHandle(error.response.data.error || 'An error occurred' , error);
  }
};
  

  const handleEnter = (e) => {
    if (e.Key === "Enter") {
      setQuestionBody((questionBody) => questionBody + '\n');
    }
  }

  return (
    <>
    <Leftsidebar/>
    <div id='ask-ques-below'>
      <div className='ask-ques'>
        <div className='ask-ques-container'>
          <h1>Ask a Public Question</h1>
          <form
            action="subtmit"
            onSubmit={handleSubmit}
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
                  placeholder='e.g Is there a R function for finding the index of an element in vector?' />
              </label>

              <label htmlFor="ask-ques-body">
                <h4>Body</h4>
                <p>Include all the information someone would need to answer your question</p>
                <textarea id='ask-ques-body'
                  rows='12' col='12'
                  value={questionBody}
                  onChange={e => setQuestionBody(e.target.value)}
                  onKeyDown={handleEnter}
                  className='ques-body'
                  type="text" />
              </label>

              <label htmlFor="ask-ques-tags">
                <h4>Tags</h4>
                <p>Add Up to 5 tags to describe what you'r question is about </p>
                <input
                  id='ask-ques-tags'
                  value={questionTags}
                  onChange={e => setTags(e.target.value.split(' '))}
                  className='ques-body'
                  type="text"
                  placeholder='e.g (xml typescript wordpress) ' />
              </label>
              <input
                className='review-btn'
                type="submit"
                value="Review your question" />
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Askquestion