const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload
    case "UPDATE_CURRENT_USER":
      // if I will return action.payload it will return one record only but i want every record to be returned including updated data of user
      return state.map(state => state._id === action.payload._id ? action.payload : state)
    case "FETCH_PHONE_NO":
      const phoneData =  JSON.stringify({...action?.payload.profile.name})
      localStorage.setItem("phone", phoneData);
    default:
      return state;
  }
};

export default usersReducer;
// redux thunk was used to do the async operation