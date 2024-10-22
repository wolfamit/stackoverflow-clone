import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import QuestionsList from './QuestionsList'
import Cards from '../Subscription/Cards'
import Leftsidebar from '../LeftsideBar/Leftsidebar'
import './Homemain.css'
import UsersCorousel from '../UsersCorousel/UsersCorousel'


const Homemain = () => {

  const questionsList = useSelector(state => state.QuestionReducer)

  //  const questionsList = [
  //   {
  //   id:1,
  //   votes:3,
  //   noOfAnswer:1,
  //   questionTitle : 'what is function?',
  //   questionBody: "It is meant to be" ,
  //   questionTags : ["java" , "node.js","react js","mangoDb"],
  //   userPosted : "Amitabh",
  //   askedOn : "jan 1"
  //  },
  //  {
  //   id:2,
  //   votes:0,
  //   noOfAnswer:1,
  //   questionTitle : 'what is for loop?',
  //   questionBody: "It is meant to be" ,
  //   questionTags : ["java" , "node.js","react js","mangoDb"],
  //   userPosted : "Amitabh",
  //   askedOn : "jan 1"
  //  },
  //  {
  //   id:3,
  //   votes:0,
  //   noOfAnswer:0,
  //   questionTitle : 'what is OOPS?',
  //   questionBody: "It is meant to be" ,
  //   questionTags : ["java" , "node.js","react js","mangoDb"],
  //   userPosted : "Amitabh",
  //   askedOn : "jan 1"
  //  },
  //  {
  //   id:4,
  //   votes:2,
  //   noOfAnswer:2,
  //   questionTitle : 'what is Redux?',
  //   questionBody: "It is meant to be" ,
  //   questionTags : ["java" , "node.js","react js","mangoDb"],
  //   userPosted : "Amitabh",
  //   askedOn : "jan 1"
  //  }
  // ]
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(state => (state.CurrentUserReducer));
  // console.log(user)


  const checkAuth = () => {
    if (user == null) {
      alert('Please login or signUp First');
      navigate('/Auth');
    } else {
      navigate('/Ask-questions');
    }
  }

  return (
    <>
      < Leftsidebar />
      <div
        id='w100'
      >
        {/* <Cards /> */} 
        <UsersCorousel />
        <div className='main-bar'>
          <div className='main-bar-header '>
            <div className='d-flex'> {
              location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
            }
              <button onClick={checkAuth} className='ask-btn'>Ask Question</button></div>

            <div className='main-bar-header'>
              {
                questionsList.data === null ?
                  <h1>Loading...</h1> :
                  <>
                    <div style={{ marginBottom: "40px", padding: "15px", borderRadius: '20px', fontSize: '20px', fontWeight: '500', backgroundColor: 'var(--bg-color-2)' }}>
                      {questionsList.data.length} questions posted
                    </div>
                    <QuestionsList questionsList={questionsList.data} />
                  </>
              }
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Homemain