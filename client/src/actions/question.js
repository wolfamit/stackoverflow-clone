import { toast } from 'react-toastify';
import * as api from '../api/index.js'  

export const askQuestion = (questionData , navigate) => async (dispatch) => {
    try {
        const {data} = await api.postQuestion(questionData);
        const { success , message } = data;
        if(success){
          toast.success(message);
          dispatch({ type: 'QUESTION_DATA', payload: data });
          dispatch(fetchAllQuestions());
          navigate('/')
        }
    } catch (error) {
        console.error('Error during posting:', error);
        if(error.response.status === 500){
          alert(error.response.data.error);
        }
        
    }
};

export const fetchAllQuestions = () => async (dispatch) => {
    try {
      const {data} = await api.getAllQuestions();
      dispatch({ type: "FETCH_ALL_QUESTIONS", payload: data });
    } catch (error) {
      console.log("fetchAllQuestions" , error.message);
    }
};

  export const deleteQuestion = (id , navigate) => async (dispatch) => {
    try {
      const {data} = await api.questionDelete(id);
      const { success , message} = data;
      if(success){
        dispatch(fetchAllQuestions());
        navigate('/')
        toast.success(message);
      }
    } catch (error) {
      console.log("deleteQuestion error :" , error.message);
    }
};

  export const postAnswer = (answerData) => async (dispatch) => {
    try {
        const { id , noOfAnswers , answerBody , userAnswered , userId } = answerData;
        const { data } = await api.postAnswer(
          id,
          noOfAnswers,
          answerBody,
          userAnswered,
          userId
        );
        const { success , message} = data;
        if(success){
          dispatch({type: "POST_ANSWER", payload: data});
          dispatch(fetchAllQuestions());
          toast.success(message);
        }
    } catch (error) {
      console.log("postAnswer error :" , error.message);
    }
};


  export const deleteAnswer = (id , answerId , noOfAnswers) => async (dispatch) => {
    try {
      const { data } = await api.deleteAnswer(id , answerId , noOfAnswers);
      const { success , message} = data;
      if(success) {
        dispatch(fetchAllQuestions());
        toast.success(message);
      }
    } catch (error) {
      console.log("AnswerDelete error :" , error.message);
    }
};

  export const upvoteQuestion = (id , value , userId) => async (dispatch) => {
    try {
      const { data } = await api.voteQuestion(id , value , userId);
      dispatch(fetchAllQuestions());
    } catch (error) {
      console.log("upvote error :" , error.message);
    }

};

  export const downvoteQuestion = (id , value , userId) => async (dispatch) => {
    try {
      const { data } = await api.voteQuestion(id , value , userId);
      dispatch(fetchAllQuestions());
    } catch (error) {
      console.log("downvote error :" , error.message);
    }
};