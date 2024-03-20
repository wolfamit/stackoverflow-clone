const authReducer = (state={data: null}, action) => {
  switch (action.type) {
    case "AUTH":
      const authdata =  JSON.stringify({...action?.data})
      localStorage.setItem("Profile", authdata);
      return { ...state, 
        data: action?.data };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, data: null };
    default:
      return state;
  }
};

export default authReducer;
// redux thunk was used to do the async operation