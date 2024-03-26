import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'

import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import Avatar from '../../components/Avatar/Avatar'
import Displayanswer from './Displayanswer'
import { deleteQuestion, postAnswer, downvoteQuestion, upvoteQuestion } from '../../actions/question'
import './QuestionDetails.css'
import { toast } from "react-toastify";

const QuestionDetails = () => {
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState('')

  const { id } = useParams();

  const questionsList = useSelector((state) => (state.QuestionReducer))
  const User = useSelector((state) => state.CurrentUserReducer);
  
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const [Answer, setAnswer] = useState("");


  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    setLoading(true);
    if (User === null || User === undefined) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
       
          dispatch(
            postAnswer({
              id,
              noOfAnswers: answerLength + 1,
              answerBody: Answer,
              userAnswered: User.data.result.name,
              userId: User.data.result._id
            })
          );
          setAnswer("");
        } 
      
        setLoading(false);
    
    }
  };

  const handleDelete = () => {
    setLoading(true);
    try {
      dispatch(deleteQuestion(id, Navigate));
    } catch (error) {
      return (<div>Error occured! Please try again.</div>)
    }finally{
      setLoading(false);
    }
  }

  const handleUpVote = () => {
    dispatch(upvoteQuestion(id, 'upvote', User.data.result._id));

  }
  const handleDownVote = () => {
    dispatch(downvoteQuestion(id, 'downvote', User.data.result._id));
  }


  return (
    <div id="below-ques-details-page">
      <div className='question-details-page' >
        {
          questionsList.data === null ?
            <h1>Loading...</h1> :
            <>
              {questionsList.data
                .filter((question) => question._id === id)
                .map((question) => (
                  <div key={question._id}>
                    <section className="question-details-container">
                      <h1 style={{color: 'var(--text-color-2)' , paddingBottom: "30px" , fontSize:"40px"}}>{question.questionTitle}</h1>
                      <div className="question-details-container-2" style={{color: 'var(--text-color-2)' , fontSize:"24px"}}>
                        <div className="question-votes">
                          <img
                            src={upvote}
                            alt="upvote"
                            width="18"
                            className="votes-icon"
                            onClick={handleUpVote}
                          />

                          <p style={{ width: "30px", backgroundColor: 'var(--bg-color-4)', borderRadius: '50%' }}>{question.upVotes.length - question.downVotes.length}</p>

                          <img
                            src={downvote}
                            alt="downvote"
                            width="18"
                            className="votes-icon"
                            onClick={handleDownVote}
                          />
                        </div>
                        <div style={{ width: "100%" }}>
                          <p className="question-body">{question.questionBody}</p>
                          <div className="question-details-tags">
                            {question.questionTags.map((tag) => (
                              <p key={tag}>{tag}</p>
                            ))}
                          </div>
                          <div className="question-actions-user">
                            <div>
                              {
                                User?.data?.result?._id === question?.UserId && (
                                    loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                  <button type="button" onClick={handleDelete}>
                                    Delete
                                  </button>
                                ))
                              }
                            </div>
                            <div>
                              <p>asked {moment(question.askedOn).fromNow()}</p>
                              <Link
                                to={`/Users/${question.UserId}`}
                                className="user-link"
                                style={{ color: "#0086d8" }}
                              >
                                <Avatar
                                  backgroundColor="orange"
                                  px="8px"
                                  py="5px"
                                  borderRadius="4px"
                                >
                                  {question.userPosted.charAt(0).toUpperCase()}
                                </Avatar>
                                <div>{question.userPosted}</div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                    {question.noOfAnswers !== 0 && (
                      <section>
                        <h3>{question.noOfAnswers} Answers</h3>
                        <Displayanswer
                          key={question._id}
                          question={question}
                  
                        />
                      </section>
                    )}
                    <section className="post-ans-container">
                      <h3>Your Answer</h3>
                      <form
                        onSubmit={(e) => {
                          handlePostAns(e, question.answer.length);
                        }}
                      >
                        <textarea
                          name="answer"
                          placeholder="Write your answer here..."
                          cols="30"
                          rows="10"
                          value={Answer}
                          onChange={(e) => setAnswer(e.target.value)}
                        ></textarea>
                        <br />
                        <input
                          type="submit"
                          className="post-ans-btn"
                          value="Post Your Answer"
                        />
                      </form>
                      <p>
                        Browse other Question tagged
                        {question.questionTags.map((tag) => (
                          <Link to="/Tags" key={tag} className="ans-tags">
                            {" "}
                            {tag}{" "}
                          </Link>
                        ))}{" "}
                        or
                        <Link
                          to="/AskQuestion"
                          style={{ textDecoration: "none", color: "#009dff" }}
                        >
                          {" "}
                          ask your own question.
                        </Link>
                      </p>
                    </section>
                  </div>
                ))}
            </>
        }
      </div>
    </div>
  )
}

export default QuestionDetails