import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('Profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).data.token}`
  }
  return req;
});

export const signin = (authData) => API.post('/user/signin', authData)
export const signup = (authData) => API.post('/user/signup', authData);

export const postQuestion = (questionData) => API.post('/question/Ask', questionData);
export const getAllQuestions = () => API.get('/question/get')
export const questionDelete = (id) => API.delete(`/question/delete/${id}`);
export const voteQuestion = (id, value, userId) => API.patch(`/question/vote/${id}`, { value, userId });
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, { id, noOfAnswers, answerBody, userAnswered, userId });
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get('/user/getAllUsers')

export const updateProfile = (id, formData) => API.patch(`/user/update/${id}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

export const addPhoneNumber = (id, phoneNumber) => API.patch(`/user/updatePhoneNumber/${id}`, { phoneNumber });

export const getAllPosts = () => API.get('/public');

export const likeDisLikePost = (id, userId, value) => API.patch(`/public/like/${id}`, { userId, value })

export const commentPost = (id, userId, value) => API.patch(`/public/comment/${id}`, { userId, value })

export const publicPost = (formData, userId) => API.post(`/public/post/${userId}`, formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})


export const publicDelete = (postId) => API.delete(`/public/delete/${postId}`);
export const addfrnd = (userId, friendId) => API.patch(`/public/add/friend/${userId}`, { friendId });
export const removefrnd = (userId, friendId) => API.patch(`/public/remove/friend/${userId}`, { friendId });

export const getSubsciptionDetails = (customerId) => API.get('/api/get-details', { customerId });