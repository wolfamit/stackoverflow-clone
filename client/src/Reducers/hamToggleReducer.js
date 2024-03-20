const toggleReducer = (state = {toggle:false}, action) => {
    switch (action.type) {
      case "SET_TOGGLE":
        return {
          ...state,
          toggle: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default toggleReducer;