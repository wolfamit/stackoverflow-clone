const initialState = false;

const toggleReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_TOGGLE":
        return action.payload
      default:
        return state;
    }
  };
  
  export default toggleReducer;