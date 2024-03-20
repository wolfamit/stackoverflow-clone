// this reducers is used to combine all the reducers
//like auth reducers to handle auth requests
//lke tags reducers to handlie tags requests

import { combineReducers } from "redux";
import authReducers from "./auth";
import  CurrentUserReducer  from "./CurrentUserReducer.js"; 
import  QuestionReducer from "./questions.js"; 
import usersReducer from "./users.js";
import toggleReducer from "./hamToggleReducer.js";
import PostReducer from "./Post.js";
import subscriptionReducer from "./subscription.js";
export default combineReducers({
        authReducers,
        CurrentUserReducer,
        QuestionReducer,
        usersReducer,
        toggleReducer,
        PostReducer,
        subscriptionReducer
    
})