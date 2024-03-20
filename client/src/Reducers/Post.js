const PostReducer = (state = { data: null }, action) => {
    switch (action.type) {
      case "PUBLIC_FEED":
        return { ...state, data: action.payload };
      default:
        return state;
    }
  }
  
  export default PostReducer;