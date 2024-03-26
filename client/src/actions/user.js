import * as api from '../api/index.js' 

export const fetchAllUsers = () => async (dispatch) => {
    try {
      const { data } = await api.getAllUsers();
      dispatch({ type: "FETCH_USERS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const updateProfile = (id, formData) => async (dispatch) => {
    try {
      const { data } = await api.updateProfile(id, formData);
      dispatch({ type: "UPDATE_CURRENT_USER", payload: data });
    } catch (error) {
      console.log("error on Update Profile" , error.message);
    }
  };

export const updatePhoneNumber = (id, phoneNumber) => async (dispatch) => {
    try {
      const { data } = await api.addPhoneNumber(id, phoneNumber); 
      dispatch({ type: "FETCH_PHONE_NO", payload: data });
    } catch (error) {
      console.log("error on phone number adding" , error.message);
    }
  };