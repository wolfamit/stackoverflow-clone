const initialState = false; // Initial state for emailVerified

const emailVerifiedReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_EMAIL_VERIFIED":
            return action.payload;
        default:
            return state;
    }
};

export default emailVerifiedReducer;