import * as api from '../api/index.js'

/* READ ALL POST*/
export const getAllPost =  () => async (dispatch) => {
    try {
        const {data} = await api.getAllPosts();
        dispatch({type: "PUBLIC_FEED" , payload: data}); 
    } catch (error) {
        console.log("feed" , error.message);
        
    }
};

/* LIKE POST */
export const Likepost = (postId, userId , value) => async (dispatch) => {
    try{
        const { data } = await api.likeDisLikePost(postId, userId , value);
        dispatch(getAllPost())
    }catch(error){
        console.log("Like" , error.message);
    } 
};

/* DISLIKE POST */
export const disLikepost = (postId, userId, value) => async (dispatch) => {
    try {
        const {data} = await api.likeDisLikePost(postId, userId , value);
        dispatch(getAllPost())
    } catch (error) {
        console.error("disLIke :" ,error.message)
    }
};

/* COMMENT ON POST */
export const postComments = (postId , userId , value) => async (dispatch) => {
    try {
        const {data} = await api.commentPost(postId, userId , value);
        dispatch(getAllPost())
    } catch (error) {
        console.error("COMMENT:" , error.message)
    }
}

/* POST POST*/
export const postAction = (formData, userId) => async (dispatch) => {
    try {
        const { data } = await api.publicPost(formData ,userId);
        dispatch(getAllPost())
    } catch (error) {
        console.error("POST ACTION:" , error.message)
    }
};

/* DELETE POST*/
export const deletePost = (postId) => async (dispatch) => {
    try{
        const { data } = await api.publicDelete(postId);
        dispatch(getAllPost())
    }catch (error){
        console.error("DELETE ACTION:" , error.message)
    }
};

/*PATCH FRIEND*/
export const addFriend = (userId , friendId) => async (dispatch) => {
    try{
        const { data } = await api.addfrnd(userId , friendId);
        dispatch(getAllPost())
    }catch (error){
        console.error("Add friend:" , error.message)
    }
};

export const removeFriend = (userId , friendId) => async (dispatch) => {
    try{
        const { data } = await api.removefrnd(userId , friendId);
        dispatch(getAllPost())
    }catch (error){
        console.error("remove friend:" , error.message)
    }
};