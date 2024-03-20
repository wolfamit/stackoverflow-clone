const QuestionReducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "POST_QUESTION":
      return { ...state } //we dont want to return data to store only the string is returned
    case "POST_ANSWER":
      return { ...state };
    case "FETCH_ALL_QUESTIONS":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default QuestionReducer;