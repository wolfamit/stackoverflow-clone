import * as api from '../api/index.js' 
import { toast } from 'react-toastify';

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

export const sendEmailOtp = (id, email) => async (dispatch) => {
    try {
      const {data} = await api.addEmailOtp(id, email); 
      const { success  } = data;
      if(success) {
        toast.success("OTP sent to email successfully");
      }
      // dispatch({ type: "VERIFY_EMAIL", payload: data });
    } catch (error) {
      console.log("error on otp sending" , error.message);
      toast.error("Failed to Send OTP. Please try again later.");
    }
};

export const verifyingEmailOtp = (email , otp) => async (dispatch) => {
    try {
      const { data } = await api.EmailOtpverify(email , otp);
      const { success } = data;
      if(success){
        await dispatch({ type: "SET_EMAIL_VERIFIED", payload: success });
        toast.success('OTP Verified');
      }
    } catch (error) {
      console.error("Error on OTP verification:", error.message);
      // Handle network errors or other exceptions
      // Optionally, you can display a generic error message to the user
      if(error.response && error.response.status === 401){
        toast.error('Incorrect OTP');
      }else{
        toast.error("Failed to verify OTP. Please try again later.");
      }

    }
  };