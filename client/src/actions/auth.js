import * as api from '../api/index.js' 
import { setCurrentUser } from './currentUser.js';


export const signin = (authdata , navigate) => async (dispatch) => {
       try {
        const data = await api.signin(authdata);
        dispatch({type: 'AUTH' , data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/')
       } catch (error) {
              console.error('Error during signin:', error.message);
       }
};


export const signup = (authdata , navigate) => async (dispatch) => {
    try {
        const data = await api.signup(authdata);
        dispatch({type: 'AUTH' , data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))));
        navigate('/')
       } catch (error) {
              // If not, log the error for debugging purposes
              console.error('Error during signup:', error.message);
          }
};



//we use dispatch here to pass the login and signin data
// Redux-thunk was used to do the async task inside REDUX