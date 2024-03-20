const subscriptionReducer = (state = [], action) => {
    switch (action.type) {
      case "SUBSCRIPTION":
        return action.payload;
        default:
            return state;
        }
    };

export default subscriptionReducer