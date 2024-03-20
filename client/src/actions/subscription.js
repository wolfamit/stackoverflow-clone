import * as api from '../api/index.js'

export const getSubDetails = (customerId) => async (dispatch) => {
    try {
        const {data} = await api.getSubsciptionDetails(customerId);
        dispatch({type: "SUBSCRIPTION" , payload: data}); 
    } catch (error) {
        console.log("SUBSCRIPTION" , error.message);
    }
};